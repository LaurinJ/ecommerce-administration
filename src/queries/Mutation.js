import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($user: userLoginData!) {
    login(user: $user) {
      accessToken
      refreshToken
      user {
        name
        email
        profile {
          profile_image
        }
      }
    }
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation logout($token: RefreshToken!) {
    logout(token: $token) {
      status
    }
  }
`;

export const EDIT_PROFILE = gql`
  mutation EditProfile($image: Upload) {
    editProfile(image: $image) {
      ... on Message {
        message
      }
      ... on Profile {
        profile_image
      }
    }
  }
`;

export const CREATE_PAYMENT_METHOD = gql`
  mutation Mutation($payment: PaymentData!, $image: Upload) {
    createPayment(payment: $payment, image: $image) {
      name
    }
  }
`;

export const EDIT_PAYMENT_METHOD = gql`
  mutation Mutation($payment: PaymentData!, $image: Upload) {
    editPayment(payment: $payment, image: $image) {
      name
    }
  }
`;

export const DELETE_PAYMENT_METHOD = gql`
  mutation Mutation($payment: PaymentData!, $image: Upload) {
    editPayment(payment: $payment, image: $image) {
      name
    }
  }
`;

export const CREATE_DELIVER_METHOD = gql`
  mutation CreateDeliverMethod($delivery: DeliveryData!, $image: Upload) {
    createDeliveryMethod(delivery: $delivery, image: $image) {
      name
      price
    }
  }
`;

export const EDIT_DELIVER_METHOD = gql`
  mutation Mutation($delivery: DeliveryData!, $image: Upload) {
    editDeliveryMethod(delivery: $delivery, image: $image) {
      _id
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation Mutation($message: MessageData!) {
    sendMessage(message: $message) {
      to
    }
  }
`;

export const ANSWER_CONTACT_MESSAGE = gql`
  mutation AnswerContactMessage(
    $answerContactMessageId: String!
    $message: ContactData
  ) {
    answerContactMessage(id: $answerContactMessageId, message: $message) {
      message
    }
  }
`;

export const SET_ADMIN_TOKEN = gql`
  mutation Mutation($token: String!) {
    setAdminToken(token: $token) {
      token
    }
  }
`;
export const DELETE_ADMIN_TOKEN = gql`
  mutation Mutation($token: String!) {
    deleteAdminToken(token: $token) {
      token
    }
  }
`;

export const CREATE_CATEGORY = gql`
  mutation Mutation($category: CategoryData!) {
    createCategory(category: $category) {
      name
    }
  }
`;

export const EDIT_CATEGORY = gql`
  mutation EditCategory($category: CategoryData!) {
    editCategory(category: $category) {
      name
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: String!) {
    deleteCategory(id: $id) {
      _id
      name
      slug
      hidden
    }
  }
`;

export const CREATE_PRODUCT = gql`
  mutation Mutation($product: ProductInputData, $images: [Upload]) {
    createProduct(product: $product, images: $images) {
      _id
      title
      slug
      description
      short_description
      code
      price
      old_price
      countInStock
      rating
      rating_sum
      categories {
        _id
        name
      }
      images
      imgurl
    }
  }
`;

export const EDIT_PRODUCT = gql`
  mutation Mutation($product: ProductInputData, $images: [Upload]) {
    editProduct(product: $product, images: $images) {
      title
      _id
      slug
      description
      short_description
      code
      price
      old_price
      countInStock
      images
      imgurl
    }
  }
`;

export const CREATE_ORDER = gql`
  mutation Mutation(
    $token: OrderTokenData
    $address: AddressData
    $person: PersonData
  ) {
    createOrUpdateOrder(token: $token, address: $address, person: $person) {
      token
    }
  }
`;

export const EDIT_ORDER = gql`
  mutation EditOrder(
    $orderNumber: String
    $order: EditOrderData
    $address: AddressData
    $person: PersonData
  ) {
    editOrder(
      orderNumber: $orderNumber
      order: $order
      address: $address
      person: $person
    ) {
      orderNumber
    }
  }
`;

export const SEND_ORDER = gql`
  mutation Mutation($orderNumber: String) {
    sendOrder(orderNumber: $orderNumber) {
      message
    }
  }
`;

export const SUSPEND_ORDER = gql`
  mutation SuspendOrder($orderNumber: String) {
    suspendOrder(orderNumber: $orderNumber) {
      message
    }
  }
`;

export const CANCEL_ORDER = gql`
  mutation CancelOrder($orderNumber: String) {
    cancelOrder(orderNumber: $orderNumber) {
      message
    }
  }
`;

export const SET_READ_CONTACT_MESSAGE = gql`
  mutation Mutation($readContactMessageId: String!) {
    readContactMessage(id: $readContactMessageId) {
      message
    }
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation Mutation($passwords: ChangePasswordData) {
    changePassword(passwords: $passwords) {
      message
    }
  }
`;
