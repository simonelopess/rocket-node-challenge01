export async function json(req, res){
    
    const buffers = [];

    //await dentro de stream aguarda cada pedaço ser retornado
    for await (const chunk of req)  {
        buffers.push(chunk)
    }

    try {
        req.body = JSON.parse(Buffer.concat(buffers).toString()); //concatena todas as partes

    } catch {
        req.body = null
    }

    res.setHeader('Content-type', 'application/json')

}