const MASTER_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL

import { gql, request } from 'graphql-request'



const GetCatagory = async () => {
  const query = gql`
    query Assets {
    categories(first: 100) {
      id
      name
      slug
      icon {
        url
      }
    }
  }
    `

  const result = await request(MASTER_URL, query)
  return result
}
const GetRestaurant = async (category) => {
  const query = gql`
  query GetRestaurants {
  restaurants(where: {categories_some: {slug: "`+ category + `"}}, first: 50) {
    aboutUs
    address
    banner {
      url
    }
    categories {
      name
    }
    id
    name
    restaurantTypes
    slug
    workingHours
    reviews {
      star
    }
  }
}

  `
  const result = await request(MASTER_URL, query)
  return result
}
const GetRestroDetais = async (RestroSlug) => {
  const query = gql`
  query RestroDetails {
  restaurant(where: {slug: "`+ RestroSlug + `"}) {
    aboutUs
    address
    banner {
      url
    }
    categories {
      name
    }
    id
    name
    restaurantTypes
    slug
    workingHours
    menu {
      ... on Menu {
        id
        category
        menuItem {
          ... on MenuItem {
            id
            name
            description
            price
            productImage {
              url
            }
          }
        }
      }
    }
      reviews {
      star
    }
  }
}

  `
  const result = await request(MASTER_URL, query)
  return result
}

const AddToCart = async (data) => {
  const query = gql`
  mutation AddToCart {
  createUserCart(data: {email: "`+ data?.email + `", productName: "` + data?.name + `", price: ` + data?.price + `, productImage: "` + data?.productImage + `" , restaurant: {connect: {slug: "` + data?.restaurantSlug + `"}}}) {
    id
  }
  publishManyUserCarts(to: PUBLISHED) {
    count
  }
}

  `
  const result = await request(MASTER_URL, query)
  return result
}

const GetUserCart = async (userEmail) => {
  const query = gql`
  query GetUserCart {
  userCarts(where: {email: "`+ userEmail + `"}) {
    id
    email
    price
    productImage
    productName
    restaurant {
      name
      banner {
        url
      }
      slug
      address
    }
  }
}

  `
  const result = await request(MASTER_URL, query)
  return result
}


const RemoveConnection = async (id) => {
  const query = gql`
  mutation RemoveConnection {
  updateUserCart(data: {restaurant: {disconnect: true}}, where: {id: "`+ id + `"}) {
    id
  }
  publishManyUserCarts(to: PUBLISHED) {
    count
  }
}
`
  const result = await request(MASTER_URL, query)
  return result
}

const DeleteCartItem = async (id) => {
  const query = gql`
  mutation DeleteItem {
  deleteUserCart(where: {id: "`+ id + `"}) {
    id
  }
}
`
  const result = await request(MASTER_URL, query)
  return result
}

const AddReview = async (data) => {
  const query = gql`
  mutation AddReview {
  createReview(
    data: {userName: "`+ data?.userName + `", email: "` + data?.email + `", star: ` + data?.star + `, profileImage: "` + data?.ProfileImage + `", reviewText: "` + data?.ReviewText + `", restaurant: {connect: {slug: "` + data?.RestroSlug + `"}}}
  ) {
    id
  }
    publishManyReviews(to: PUBLISHED) {
    count
  }
}
`
  const result = await request(MASTER_URL, query)
  return result
}

const GetRestroReview = async (slug) => {
  const query = gql`
  query GetRestroReviews {
  reviews(where: {restaurant: {slug: "`+ slug + `"}} , orderBy: publishedAt_DESC) {
    star
    userName
    reviewText
    profileImage
  }
}
`
  const result = await request(MASTER_URL, query)
  return result
}

const UploadOrder = async (data) => {
  const query = gql`
  mutation UploadOrder {
  createOrderDetail(
    data: {customerName: "`+ data?.userName + `", address: "` + data?.address + `", zipCode: ` + data?.zip + `, email: "` + data?.email + `", phone: ` + data?.phone + `, itemImageUrl: "` + data?.ItemImageUrl + `", itemName: "` + data?.itemName + `", orderStatus: Active, price: ` + data?.price + `, restroName: "` + data?.restroName + `"}
  ) {
    id
  }
  publishManyOrderDetails(to: PUBLISHED) {
    count
  }
}
`
  const result = await request(MASTER_URL, query)
  return result
}

export default { GetCatagory, GetRestaurant, GetRestroDetais, AddToCart, GetUserCart, RemoveConnection, DeleteCartItem, AddReview, GetRestroReview, UploadOrder }

