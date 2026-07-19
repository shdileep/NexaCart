const fs = require('fs');
const path = require('path');
const https = require('https');

const screens = [
  {
    id: 'c99be0db92924971aaa7432b2fcf28e4',
    title: 'Product Detail Page',
    html: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1NmUwNThmZWQ2MmMwMWE2MDgyNzdmMWFkMTdiEgsSBxD26brz3gcYAZIBIwoKcHJvamVjdF9pZBIVQhM2ODIwODY4ODYzNTI0NjM3OTU5&filename=&opi=89354086',
    img: 'https://lh3.googleusercontent.com/aida/AP1WRLsqN3GLiQgkHU1Jv5XbYQsunKlT7uItsc1WRjJ-UPlYf8hBDLtX-CE2iGjWbvoXxA13qkfi5nUhC-GKcF_18xw70idJ_sg_XMR6BAmtCEeJlmO7DoBE1l_39G_vnR5hvY0A9KhBhD5dkWTnO_Y-tJuUiRLXHwjiaWEYhoZ24232xzR-nlQ62qnp_4i0IwIqAxkFsvWqZCzLUU5mSD0Sbc6NcEfmwa6C1YhTaCuw8bLISjbdQBPozBObivM'
  },
  {
    id: '06c5a2afab5f483a93e15e3da7b6c9e7',
    title: 'Order Details',
    html: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2FmM2FmYTVkYzIwZjRhOTM5MDNjYjNhOThhMzM4ZmIxEgsSBxD26brz3gcYAZIBIwoKcHJvamVjdF9pZBIVQhM2ODIwODY4ODYzNTI0NjM3OTU5&filename=&opi=89354086',
    img: 'https://lh3.googleusercontent.com/aida/AP1WRLsXNnxwM62L3zScgqrsxm6xoDhofT4P6ZUx0YPhd0nAHZTBtL0B8I9JTb7mDT7hYVXh8UIMl25aLlthNP4egMfBhP1FYrCVZvVMP5czeEkwM1Pa6YmHh4hjeKRqZVzCfulJ6cQXowL9l36NLy3kSlvxAeN5Frbg3lTCO_5hOn6E9Zwj_36nyra0sXVALSRQsYkRY6mkS3rQk-6zuMawGuQNzjCiEq7vf2r1xW7U8p3s23696BiolOnZOw'
  },
  {
    id: '18d47c0cd67241f48a2588022b5218c8',
    title: 'My Orders',
    html: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzVhNTViMTk2M2UzODQ1OGRiNTY3NTcwNzBlY2VlYWVkEgsSBxD26brz3gcYAZIBIwoKcHJvamVjdF9pZBIVQhM2ODIwODY4ODYzNTI0NjM3OTU5&filename=&opi=89354086',
    img: 'https://lh3.googleusercontent.com/aida/AP1WRLtY1Qtncsgu4vX4-jwpzERQK8iz6nVNAnfp2vxZQUObYND9KeLmQYvjRhQpF_sH9t2Tlwj68R8I8uWZdCIqOXAL__64Q6eDT-9AVG4mzoCzc752IXxiCETJkwpXxVffceodcX9nSiceWuqzHoxvE8LVNbY6sLNDddjLrJcfhj2FGkTyjpumGNomPT8ziCRP-dgNj330o7bLCZMguDzRJLNBAOQKuw9OnvT4XP3CyK3XfAaP_aycbXCAY_o'
  },
  {
    id: '55c53aab335343eda450c648458dca45',
    title: 'User Profile',
    html: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2ExZjhiODAxODA4NTRhMTRiNjYyMjlkYWI0MGMwODk1EgsSBxD26brz3gcYAZIBIwoKcHJvamVjdF9pZBIVQhM2ODIwODY4ODYzNTI0NjM3OTU5&filename=&opi=89354086',
    img: 'https://lh3.googleusercontent.com/aida/AP1WRLvQIjsvAQ48pT9MOMZQst1TsA6jYbeos_Rgng-uzB7vrb0dKHJ-PtS8OSpgCZNctuxBylVLLHWpoA7VkuqoYzuZj7MA57RGg63O8T5KuCYh58ABCGa4oE3A9qHqO31BWPRCpZcEMNCE0-Ex5LdqdrX2HziDCD8Pnvg928-EI3aglEEUVkcTTzPDHWPXkvElFn4Kfr8BrLlp-CF2NeMZG6R3SW7XTKLVWXPpy6kx2F_9PGoHywiELKUcfMA'
  },
  {
    id: '653fc98b37254752b36552d44d09e0ac',
    title: 'My Wishlist',
    html: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzc3MjY3ZmExODVlYzRjMTA4MTk3OGRjOGNlZTg1MTc5EgsSBxD26brz3gcYAZIBIwoKcHJvamVjdF9pZBIVQhM2ODIwODY4ODYzNTI0NjM3OTU5&filename=&opi=89354086',
    img: 'https://lh3.googleusercontent.com/aida/AP1WRLsMftRftEJgFz82z3oftjUhdJtcCLYg9S9WblmLG5T2IAiRDWXTcBDlOHKBn77wToQ-k9B4KGlwYhDiQ4JUH-zgzl8zppvvoXyVNbkNUxOVljEezBeMzrGeBaIPb-lBjxWd7rxEtAVVzj0ERUBCP2W9iC4EQlHsRX9DPKEgbzPN3OPLrq0atGUVSkopkNBe20j0EP_HjlIyb_R3DWVByRGFONflVeQeVJtv-O07jS_Gs-IwfQh_z8aR0Oo'
  },
  {
    id: 'a80467ee31624617aee5ec23c2209dd5',
    title: 'Shopping Cart',
    html: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2Q2MWU4YTgyOTRjNTQ5ODFiZTM5YzQ2NjczMzQzMDU3EgsSBxD26brz3gcYAZIBIwoKcHJvamVjdF9pZBIVQhM2ODIwODY4ODYzNTI0NjM3OTU5&filename=&opi=89354086',
    img: 'https://lh3.googleusercontent.com/aida/AP1WRLtLdZKcknE32WnvaqzkJ1ilAAHLzrx6c24RiCtkkXY6GGZApFXbIWZcPOU781hXdxkUZ1s372QM0KGWdy13b0_KV7WOGUeDZU3i192utPHTnHI7_esGoRlEObrKgVueA6oHRiZrj6fvOrAOe6gSRJfnFwPd_GfkuyDLJv4ykJEzvXj60HpGtHOI5O_k0t9jj5aB9aYQvCcOrfn3Yni2ecgbZ5LApr9Nc_L14T9tVpiH5xWe8l8'
  },
  {
    id: '08079e840bf147b7b6a2450f7e71bf0d',
    title: 'Home Dashboard',
    html: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1NmUwNjY2NTg4MDQwMDMwMWYxMzFkMGRkMTlmEgsSBxD26brz3gcYAZIBIwoKcHJvamVjdF9pZBIVQhM2ODIwODY4ODYzNTI0NjM3OTU5&filename=&opi=89354086',
    img: 'https://lh3.googleusercontent.com/aida/AP1WRLu9e48GQt3rGnsp_OySlXrjG3HIsYDI2R5loUvmhFhpgtxJs0uJkxRdYjYSzYkVgxLcZzbKBOy0B5d_vq9ZDcFtUQqIfYyVrQSmwwPLSp4kZJ469fs9_UZIXwCKGJTFZXAK3T1-8WKTn99oYez8wReNSZxyThFdZ8cL_qT9OeOOhA9sP8WUCQF3ufr097-PKYf21c4YA0OPtJrtAU3TJGTdrzzbYZsEUcRmgxIycsmVnOzya5jCoM39ZA0'
  },
  {
    id: '475de1febbe048f38854699eee15f4de',
    title: 'Product Search',
    html: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzQ3OWRiMDUxNmM2ZjRhZGM5NDMyM2QyNzliNGViMjA2EgsSBxD26brz3gcYAZIBIwoKcHJvamVjdF9pZBIVQhM2ODIwODY4ODYzNTI0NjM3OTU5&filename=&opi=89354086',
    img: 'https://lh3.googleusercontent.com/aida/AP1WRLvCIkW2gdzUI3hcgs7_1uewKW9cm4KTiFNFYsBzs5u5WXD527gF_zGm8jkX2inbK7D4Hf1nciHia13eKd13mq9R4F07OWyyiatRWJnUVx-we03sZN9ioZoa6d2SGzSf3WcQBySq88QX0kyj0HbFQog0bEDdW_4tI6qtycNdr-0H_SwEyTSCdykXMfnjqb9OG3vEaRzsKAWo_TlsvbPhMoeuHd01ZTo2AfnV9ac6O0jpsEVUhEs2f7GTuyA'
  },
  {
    id: '7b7f22d5ea344231b7f8a726faa78919',
    title: 'Browse Categories',
    html: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1NmUwODhmZjkxMzIwMGRiNDg2NzE4MTdmZjg4EgsSBxD26brz3gcYAZIBIwoKcHJvamVjdF9pZBIVQhM2ODIwODY4ODYzNTI0NjM3OTU5&filename=&opi=89354086',
    img: 'https://lh3.googleusercontent.com/aida/AP1WRLusPawel5f9cBZL6xYWo62rE-2KY3B9S-wXHfQqYKzR5nNuUYImTkmeUHrjPK4D_Mo6TU51Y2q7Fuy0dLGpW1qBRfJtINDVrkP20zmZ9aCdD3IL_jsAiun0YXof1FAsqc_nYfNRVU8zD1rfaVigdzMjU5uYdFVLiNcd4ZFYI0lnEMbalJW4sQdwZt53B220PqS7MmdIQK6T3vST9rqzlEGvXQRM8pTQjwQYD4_AEpMIX7AZ5-LiKTjj_Ds'
  }
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      // Handle redirects
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        downloadFile(response.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: status ${response.statusCode} for ${url}`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  const codeDir = path.join(__dirname, '..', 'code');
  const imgDir = path.join(__dirname, '..', 'images');

  if (!fs.existsSync(codeDir)) fs.mkdirSync(codeDir, { recursive: true });
  if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir, { recursive: true });

  for (const s of screens) {
    console.log(`Downloading ${s.title} (${s.id})...`);
    try {
      const htmlPath = path.join(codeDir, `${s.id}.html`);
      await downloadFile(s.html, htmlPath);
      console.log(`  Saved HTML to ${htmlPath}`);

      const imgPath = path.join(imgDir, `${s.id}.jpg`);
      await downloadFile(s.img, imgPath);
      console.log(`  Saved Image to ${imgPath}`);
    } catch (err) {
      console.error(`Error downloading ${s.title}:`, err.message);
    }
  }
  console.log('Finished downloading all screens!');
}

run();
