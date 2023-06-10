async function ImagetoBase64(file: File): Promise<string | ArrayBuffer | null> {
    const reader = new FileReader()
    reader.readAsDataURL(file)

    const data = new Promise<string | ArrayBuffer | null>((resolve, reject) => {
        reader.onload = () => resolve(reader.result)
        reader.onerror = err => reject(err)
    })

    return data
}

export { ImagetoBase64 }