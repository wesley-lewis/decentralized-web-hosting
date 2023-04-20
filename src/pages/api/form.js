const fs = require("fs")

export default async function handler(req, res) {
  const body = req.body

  const { name } = body;

  if (!body.file && !name) {
    return res.status(400).json({ data: 'No file received' })
  }

  fs.mkdir(`./files/${name}`, (err) => {
    return console.error(err)
  })

  fs.writeFile(`files/${name}/index.html`, body.file, function (err) {
    if (err) {
      return console.error(err)
    }
  })


  res.status(200).json({ data: 'File received and deployed to ipfs with hash as ' })

}