import { request, gql } from 'graphql-request'

const MASTER_URL = 'https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clv4ag2rx03lk08w75cr1hp8y/master'

const getSlider = async () => {
  const query = gql`
    query GetSlider {
      sliders {
        id
        name
        image {
          url
        }
      }
    }
  `
  const result = await request(MASTER_URL, query);
  return result;
}

const getCategories = async () => {
  const query = gql`
  query GetCategory {
    categories {
      id
      name
      icon {
        url
      }
    }
  }
  `
  const result = await request(MASTER_URL, query);
  return result;
}

const getBusinessList = async () => {
  const query = gql`
  query getBusinessList {
    businessLists {
      id
      name
      email
      contactPerson
      category {
        name
      }
      address
      about
      images {
        url
      }
    }
  }  
  `
  const result = await request(MASTER_URL, query);
  return result;
}

const getBusinessListByCategory = async (category) => {
  const query = gql`
  query getBusinessList {
    businessLists(where: {category: {name: "`+category+`"}}) {
      id
      name
      email
      contactPerson
      category {
        name
      }
      address
      about
      images {
        url
      }
    }
  }
  `
  const result = await request(MASTER_URL, query);
  return result;
}

export default {
  getSlider,
  getCategories,
  getBusinessList,
  getBusinessListByCategory,
}
