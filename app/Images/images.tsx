import mainLogo from './favicon.jpg'

export const images = {
    mainLogo: mainLogo,
} as const

export type ImageKey = keyof typeof images 