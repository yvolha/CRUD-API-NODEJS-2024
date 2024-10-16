export function printMagentaText(text: string){
    console.log('\x1b[35m', text, '\x1b[0m')
}

export function printYellowText(text: string){
    console.log('\x1b[33m', text, '\x1b[0m')
}

export function printBlueText(text: string){
    console.log('\x1b[34m', text, '\x1b[0m')
}

export function printGreenText(text: string){
    console.log('\x1b[32m', text, '\x1b[0m')
}