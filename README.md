
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


  ## To run ML model:
  * Normally install all the requirements form requirements.txt
  * Go to ml folder and run the main.py using ```uvicorn main:app --reload```
  * install gensim=3.6.0 as other will give error -> ```python pip3 install gensim==3.6.0```
  #### Then for this error :
 ```
  File "C:\Users\hp\AppData\Roaming\Python\Python310\site-packages\gensim\corpora\dictionary.py", line 11, in <module>
    from collections import Mapping, defaultdict
ImportError: cannot import name 'Mapping' from 'collections' (C:\Program Files\Python310\lib\collections\__init__.py)
```
#### Use this :
* Go to ```"C:\Users\hp\AppData\Roaming\Python\Python310\site-packages\gensim\corpora\dictionary.py``` as shown in error.
* Then replace ```from collections import Mapping, defaultdict``` *with*  
```  
from collections import defaultdict
from collections.abc import Mapping
```
## Getting Started

  

First, run the development server:

  

```bash

npm run  dev

# or

yarn dev

# or

pnpm dev

```

  

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

  

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

  

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

  

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

  

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

  

## Learn More

  

To learn more about Next.js, take a look at the following resources:

  

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

  

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

  

## Deploy on Vercel

  

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

  

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
