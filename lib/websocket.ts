export class VideoWebSocket {
  private ws: WebSocket | null = null;
  private readonly url: string;
  private isConnected: boolean = false;
  private reconnectAttempts: number = 0;
  private readonly maxReconnectAttempts: number = 5;
  private lastFrameTime: number = 0;
  private readonly frameInterval: number = 100; // 100ms = 10fps
  public onMessage: ((data: Blob) => void) | null = null;

  constructor() {
    this.url = `ws://${window.location.hostname}:8080/ws/video/`;
  }

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.ws = new WebSocket(this.url);
        this.ws.binaryType = 'blob';  // Set to receive binary data as Blob

        this.ws.onopen = () => {
          this.isConnected = true;
          this.reconnectAttempts = 0;
          console.log('WebSocket connected');
          resolve();
        };

        this.ws.onclose = () => {
          this.isConnected = false;
          console.log('WebSocket closed');
          // this.attemptReconnect();
        };

        this.ws.onerror = (error) => {
          console.error('WebSocket error:', error);
          reject(error);
        };

        this.ws.onmessage = (event: MessageEvent) => {
          if (event.data instanceof Blob && this.onMessage) {
            this.onMessage(event.data);
           }
        };
      } catch (error) {
        reject(error);
      }
    });
  }

//   private attemptReconnect() {
//     if (this.reconnectAttempts < this.maxReconnectAttempts) {
//       this.reconnectAttempts++;
//       console.log(`Attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
//       setTimeout(() => this.connect(), 2000);
//     }
//   }

  sendFrame(blob: Blob) {
    if (!this.isConnected || !this.ws) {
      console.warn('WebSocket is not connected');
      return;
    }

    const now = Date.now();
    if (now - this.lastFrameTime >= this.frameInterval) {
      this.ws.send(blob);
      this.lastFrameTime = now;
    }
  }

  isConnectedAndReady(): boolean {
    return this.isConnected && this.ws !== null;
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
      this.isConnected = false;
    }
  }
} 