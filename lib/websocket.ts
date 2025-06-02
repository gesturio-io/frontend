export class VideoWebSocket {
  private ws: WebSocket | null = null;
  private readonly url: string;
  private isConnected: boolean = false;
  private reconnectAttempts: number = 0;
  private readonly maxReconnectAttempts: number = 5;
  private lastFrameTime: number = 0;
  private readonly frameInterval: number = 100; // 100ms = 10fps
  private reconnectTimeout: NodeJS.Timeout | null = null;
  public onMessage: ((data: Blob) => void) | null = null;
  public onError: ((error: Event) => void) | null = null;
  public onConnectionChange: ((connected: boolean) => void) | null = null;

  constructor(customUrl?: string) {
    // Allow custom URL or fallback to default
    this.url = customUrl || `ws://${window.location.hostname}:8080/ws/video/`;
  }

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        // Clear any existing connection
        this.disconnect();

        console.log(`Attempting to connect to WebSocket: ${this.url}`);
        this.ws = new WebSocket(this.url);
        this.ws.binaryType = 'blob';

        // Set a connection timeout
        const connectionTimeout = setTimeout(() => {
          if (this.ws && this.ws.readyState === WebSocket.CONNECTING) {
            this.ws.close();
            reject(new Error('WebSocket connection timeout'));
          }
        }, 10000); // 10 second timeout

        this.ws.onopen = () => {
          clearTimeout(connectionTimeout);
          this.isConnected = true;
          this.reconnectAttempts = 0;
          console.log('WebSocket connected successfully');
          
          if (this.onConnectionChange) {
            this.onConnectionChange(true);
          }
          resolve();
        };

        this.ws.onclose = (event) => {
          clearTimeout(connectionTimeout);
          this.isConnected = false;
          console.log(`WebSocket closed. Code: ${event.code}, Reason: ${event.reason}`);
          
          if (this.onConnectionChange) {
            this.onConnectionChange(false);
          }

          // Only attempt reconnect if it wasn't a manual disconnect
          if (event.code !== 1000) { // 1000 = normal closure
            this.attemptReconnect();
          }
        };

        this.ws.onerror = (error) => {
          clearTimeout(connectionTimeout);
          console.error('WebSocket error:', error);
          
          if (this.onError) {
            this.onError(error);
          }
          
          // If we're still connecting, reject the promise
          if (this.ws?.readyState === WebSocket.CONNECTING) {
            reject(new Error('Failed to connect to WebSocket server'));
          }
        };

        this.ws.onmessage = (event: MessageEvent) => {
          if (event.data instanceof Blob && this.onMessage) {
            this.onMessage(event.data);
          }
        };

      } catch (error) {
        console.error('Error creating WebSocket:', error);
        reject(error);
      }
    });
  }

  private attemptReconnect() {
    // Clear any existing reconnect timeout
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }

    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000); // Exponential backoff, max 30s
      
      console.log(`Attempting to reconnect in ${delay}ms... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
      
      this.reconnectTimeout = setTimeout(async () => {
        try {
          await this.connect();
        } catch (error) {
          console.error('Reconnection failed:', error);
          // The error handling will trigger another reconnect attempt if needed
        }
      }, delay);
    } else {
      console.error('Max reconnection attempts reached. Please check your WebSocket server.');
    }
  }

  sendFrame(blob: Blob) {
    if (!this.isConnected || !this.ws || this.ws.readyState !== WebSocket.OPEN) {
      console.warn('WebSocket is not connected or ready');
      return false;
    }

    const now = Date.now();
    if (now - this.lastFrameTime >= this.frameInterval) {
      try {
        this.ws.send(blob);
        this.lastFrameTime = now;
        return true;
      } catch (error) {
        console.error('Error sending frame:', error);
        return false;
      }
    }
    return false;
  }

  isConnectedAndReady(): boolean {
    return this.isConnected && 
           this.ws !== null && 
           this.ws.readyState === WebSocket.OPEN;
  }

  disconnect() {
    // Clear reconnect timeout
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }

    if (this.ws) {
      // Use normal closure code to prevent reconnection
      this.ws.close(1000, 'Manual disconnect');
      this.ws = null;
    }
    
    this.isConnected = false;
    this.reconnectAttempts = 0;
    
    if (this.onConnectionChange) {
      this.onConnectionChange(false);
    }
  }

  // Method to check if server is reachable
  static async testConnection(url?: string): Promise<boolean> {
    const testUrl = url || `ws://${window.location.hostname}:8080/ws/video/`;
    
    return new Promise((resolve) => {
      const testWs = new WebSocket(testUrl);
      const timeout = setTimeout(() => {
        testWs.close();
        resolve(false);
      }, 5000);

      testWs.onopen = () => {
        clearTimeout(timeout);
        testWs.close();
        resolve(true);
      };

      testWs.onerror = () => {
        clearTimeout(timeout);
        resolve(false);
      };
    });
  }

  // Get connection status info
  getStatus() {
    return {
      isConnected: this.isConnected,
      reconnectAttempts: this.reconnectAttempts,
      url: this.url,
      readyState: this.ws?.readyState,
      readyStateText: this.ws ? this.getReadyStateText(this.ws.readyState) : 'No connection'
    };
  }

  private getReadyStateText(readyState: number): string {
    switch (readyState) {
      case WebSocket.CONNECTING: return 'CONNECTING';
      case WebSocket.OPEN: return 'OPEN';
      case WebSocket.CLOSING: return 'CLOSING';
      case WebSocket.CLOSED: return 'CLOSED';
      default: return 'UNKNOWN';
    }
  }
}