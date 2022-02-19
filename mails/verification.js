exports.view = (data) => {
  return `
      <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${data.title}</title>
  </head>
  <body>
      Welcome ${data.name}

      <br><br>
      
      
      please click the link below to verify your account 🙏 <br><br>

      <a href="${data.url}"> Click here to verify</a>
<br><br>
      or 
      <br><br>
        ${data.url}

        <br><br>


        Have a great day!!!  🚀 🚀 🚀 🚀 
       
  </body>
  </html>
      
      `;
};
