# Elasticsearch Full Text Search With Classic Literature
## About

This is an application I made for learning purposes, following [a great blog post from Patrick Triest](https://blog.patricktriest.com/text-search-docker-elasticsearch/) as a step by step guide. I learned about [Koa](https://koajs.com/), [clever regex usage](https://blog.patricktriest.com/you-should-learn-regex/) and [CORS](https://ieftimov.com/posts/deep-dive-cors-history-how-it-works-best-practices/) with this mini project. The original article is awesome and very thoroughly explained. I strongly recommend that you read it. Kudos and appreciation to Patrick!

## How it works

Since the original blog post is a bit dated, I had to update some parts of the code. I also updated every component to the latest version available at the time of writing this README.

The application is a simple API connected to a Elasticsearch instance. A front-end web application interacts with this API, making text requests based on the user input. These requests arrive at our endpoints, go through our middlewares and finally query data from Elasticsearch. This data is fetched back to the front-end UI and presented to the user.

The books are sliced in paragraphs, so you can click on any result card, and read the exact paragraph where the matched text belongs. The literature in it comes from [Project Gutenberg](https://gutenberg.org/), 100 selected classics, available on Patrick's post ([here](https://cdn.patricktriest.com/data/books.zip) is the download link).

## Run locally
To run the application locally, deployment is made via Docker Compose. If you want to give it a try, all you need to do is install [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/), and then clone this repository. Move to the cloned directory. Then, download the books.zip file from the link above, extract it, and put the contents (.txt files) inside the './books/' directory. Once that's done, execute the following commands:

``` bash
# Note: you can use 'docker compose' instead of 'docker-compose' if you have Docker CLI v2.4.0 or higher installed.

# Build the API service
docker-compose build 
# Run the entire stack (API server, Elasticsearch, front-end application)
docker-compose run 
```


