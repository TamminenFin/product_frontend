const translate = {
  home: {
    logo: "Logo",
    goToLoginButton: "Be a Seller",
    goToDashboard: "Dashboard",
    footerText: "Your Marketplace. All rights reserved.",
    searchPlaceholder: "Search...",
    selectCity: "Select Location",
  },
  productDetailsPage: {
    labels: {
      location: "Location",
      shopName: "Shop Name",
      phoneNumber: "Phone Numbe",
    },
  },
  signIn: {
    heading: "Sign In",
    title: "Join us to access all the features and get started",
    labels: {
      email: "Email Address",
      password: "Password",
    },
    emailPlaceholder: "Enter your Email",
    buttonText: "Sign In",
    footertitle: "Don’t have an account?",
    footerButtonText: "Sign Up",
  },
  signUp: {
    title: "Sign up",
    subtitle: "Create an account to continue",
    fields: {
      userName: {
        label: "User Name",
        placeholder: "User name",
      },
      email: {
        label: "Email Address",
        placeholder: "Enter your email",
      },
      phone: {
        label: "Phone Number",
        placeholder: "Enter your Contact Number",
      },
      password: {
        label: "Password",
        placeholder: "●●●●●●●",
      },
      address: {
        label: "Address",
        placeholder: "Your address",
      },
      city: {
        label: "City",
        placeholder: "Select a City",
      },
      postalCode: {
        label: "Postal Code",
        placeholder: "Post Code",
      },
      shopName: {
        label: "Shop Name",
        placeholder: "Your shop name",
      },
      shopID: {
        label: "Shop ID (Optional)",
        placeholder: "Shop ID (Optional)",
        tooltip: "This is your unique shop identifier, if available.",
      },
    },
    button: "Sign Up",
    footer: {
      text: "Already have an account?",
      link: "Login",
    },
  },
  selectCategory: {
    title: "Select Category",
    subtitle:
      "We provide various categories. You can choose your categories here, and you need to pay $10 for each category every month.",
    button: "Send Request",
    totalText: "Select categories to see the total cost.",
    totalText1st: "You have selected ",
    totalText2st: "category(ies). Total cost: ",
    totalText3st: "month.",
  },
  admin: {
    routes: {
      dashboard: "Dashboard",
      categories: "Categories",
      sallers: "Sallers",
      products: "Products",
      subscriptionCheck: "Subscription-Check",
      requests: "Requests",
      logout: "Logout",
    },
    statisticPage: {
      totalProduct: "Total Product",
      totalCategory: "Total Category",
      totalSaller: "Total Saller",
    },
    categoriesPage: {
      heading: "All Category",
      buttonText: "Create Category",
      createModal: {
        heading: "Create a New Category",
        title: "Fill in the details below to create a new category.",
        inputLabel: "Category Name",
        placeholderText: "Enter category name",
        actionButton: "Create",
      },
      deleteModal: {
        heading: "Confirm Deletion",
        title1stPart: "Are you sure you want to delete",
        title2ndPart: "This action cannot be undone.",
        buttons: {
          cancel: "Cancel",
          delete: "Delete",
        },
      },
    },
    sallers: {
      heading: "Sallers",
      searchPlaceholder: "Filter Email...",
      tableHeadings: {
        name: "Name",
        email: "Email",
        contact: "Contact",
        totalCategory: "Total Category",
        totalProduct: "Total Product",
        status: "Status",
        action: "Action",
      },
      buttons: {
        next: "Next",
        previous: "Previous",
      },
      modal: {
        heading: "Set Subscription Period",
        title:
          "Please select the start and end dates for your subscription period.",
        monthButton: "Month",
        labels: {
          startDate: "Start Date",
          endDate: "End Date",
        },
        confirmButton: "Confirm",
      },
    },
    sallerProductPage: {
      heading: "Saller Products",
      searchPlaceholder: "Filter Product...",
      tableHeadings: {
        name: "Name",
        image: "Image",
        location: "Location",
        category: "Category",
        price: "Price",
        sallerName: "Saller Name",
        action: "Action",
      },
      buttons: {
        next: "Next",
        previous: "Previous",
      },
    },
    allProductPage: {
      /// this product page for admin and saller also. if you cange once then this will change everywhere
      heading: "Products",
      searchPlaceholder: "Filter Product...",
      tableHeadings: {
        name: "Name",
        image: "Image",
        location: "Location",
        category: "Category",
        price: "Price",
        createdAt: "Created At",
        sallerName: "Saller Name",
        action: "Action",
      },
      addProductButton: "Add Product",
      buttons: {
        next: "Next",
        previous: "Previous",
      },
    },
    subscriptionCheck: {
      heading: "Deadline Soon!!",
      searchPlaceholder: "Filter Email...",
      tableHeadings: {
        name: "Name",
        email: "Email",
        contact: "Contact",
        startDate: "Start Date",
        endDate: "End Date",
        transactionId: "	Transaction Id",
      },
      buttons: {
        next: "Next",
        previous: "Previous",
      },
      modal: {
        heading: "Add Transaction ID",
        title:
          "Please enter the transaction ID carefully. Once submitted, this ID cannot be changed.",
        inputLabel: "Transaction ID",
        inputPlaceholder: "Enter Transaction ID",
        buttonText: "Add",
      },
    },
    requestsPage: {
      heading: "Request for Category",
      searchPlaceholder: "Filter Category...",
      addButton: "Add Category",
      tableHeadings: {
        category: "Category",
        sallerEmail: "Saller Email",
        haveProduct: "Have Product",
        createdAt: "Created At",
      },
      buttons: {
        next: "Next",
        previous: "Previous",
      },
    },
  },
  sallerDashboard: {
    routes: {
      dashboard: "Dashboard",
      myCategory: "My Category",
      product: "Product",
      categoryRequest: "Category Request",
      logout: "Logout",
    },
    dashboardPage: {
      headings: {
        beforeDateText: "Your subscription will end in : ",
        afterDateText: "Day",
      },
      cardTitels: {
        totalProduct: "Total Product",
        totalCategory: "Total Category",
      },
    },
    myCategoryPage: {
      heading: "Category",
      title: "Select and manage your categories below",
      buttonText: "Update",
      footer: {
        heading: "Need more categories?",
        contactNumber: "+8801615718970",
        beforeContactText:
          "If you need an increased category limit, feel free to contact us at",
        afterContactText: "for assistance. We’re here to help!",
      },
    },
    categoryRequestPage: {
      heading: "Request a New Category",
      fieldLabels: {
        categoryName: "Category Name",
        numOfProduct: "Number of Products",
      },
      buttonText: "Submit Request",
    },
    addProductPage: {
      heading: "Add Product",
      labels: {
        image: "Upload Product Image",
        name: "Name",
        price: "Price",
        category: "Category",
        description: "Description",
      },
      placeholder: {
        price: "Enter price (e.g., 20.45)",
        image: "Click to browse file",
      },
      buttonText: "Add Product",
      selectError: "You can select maximum 2 category!",
    },
    editProductPage: {
      heading: "Edit Product",
      labels: {
        image: "Upload Product Image",
        name: "Name",
        price: "Price",
        category: "Category",
        description: "Description",
      },
      buttonText: "Edit Product",
      selectError: "You can select maximum 2 category!",
    },
  },
};

export default translate;
