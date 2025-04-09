import mainLogo from './favicon.jpg'
import learnSvg from './undraw_online-learning_tgmv.svg'

export const images = {
    mainLogo: mainLogo,
    learnSvg: learnSvg
} as const

export type ImageKey = keyof typeof images 