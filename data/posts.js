import { USERS } from "./users";

export const POSTS = [
    {
        imageUrl: 'http://cdn.akc.org/content/article-body-image/lab_puppy_dog_pictures.jpg',
        user: USERS[0].user,
        likes: 7870,
        caption: 'look at my cute dog!',
        profile_picture: USERS[0].image,
        comments: [
            {
                user: USERS[1].user,
                comment: 'wow ur dog is so cute!'
            }        
        ],
    },
    {
        imageUrl: 'https://cdn.shopify.com/s/files/1/1147/7882/files/streetwear-outfit-joggers-dad-hat_large.jpg?v=1577115575',
        user: USERS[1].user,
        likes: 376,
        caption: 'fit check',
        profile_picture: USERS[1].image,
        comments: [
            {
                user: USERS[0].user,
                comment: "wow who's that hottie?"
            },
            {
                user: USERS[2].user,
                comment: 'fire'
            },           
        ],
    },
    {
        imageUrl: 'https://pbs.twimg.com/media/D9l5XAhXsAEd4cg.jpg',
        user: USERS[2].user,
        likes: 10392,
        caption: 'my paradise',
        profile_picture: USERS[2].image,
        comments: [
            {
                user: USERS[0].user,
                comment: 'amazing view'
            },
            {
                user: USERS[1].user,
                comment: 'where is this???'
            },           
        ],
    },
]