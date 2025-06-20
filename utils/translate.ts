const translate = {
  home: {
    logo: "Logo",
    goToLoginButton: "Registrarse como vendedor",
    goToDashboard: "Panel de Control",
    footerText: "Las Tiendas. Reservados todos los derechos.",
    searchPlaceholder: "Buscar...",
    selectCity: "Seleccionar Ubicación",
  },
  productDetailsPage: {
    labels: {
      location: "Ubicación",
      shopName: "Nombre de Tienda",
      phoneNumber: "Número Telefónico",
    },
  },
  signIn: {
    heading: "Registrarse",
    title: "Unete a Nosotros para promocionar tus productos y servicios",
    labels: {
      email: "Correo Electronico",
      password: "Contraseña",
    },
    emailPlaceholder: "Ingrese su Correo",
    buttonText: "Ingresar",
    footertitle: "No tiene  una cuenta?",
    footerButtonText: "Registrarse",
  },
  signUp: {
    title: "Registrarse",
    subtitle: "Crear una cuenta y continuar",
    fields: {
      userName: {
        label: "Usuario",
        placeholder: "User name",
      },
      email: {
        label: "Correo electrónico",
        placeholder: "Enter your email",
      },
      phone: {
        label: "Número Telefónico",
        placeholder: "Enter your Contact Number",
      },
      password: {
        label: "Contraseña",
        placeholder: "●●●●●●●",
      },
      address: {
        label: "Dirección",
        placeholder: "Your address",
      },
      city: {
        label: "Ciudad",
        placeholder: "Select a City",
      },
      postalCode: {
        label: "Código Postal",
        placeholder: "Post Code",
      },
      shopName: {
        label: "Nombre de Tienda",
        placeholder: "Your shop name",
      },
      shopID: {
        label: "RUC (Opcional)",
        placeholder: "Shop ID (Optional)",
        tooltip: "Si usted tiene RUC, usar esta casilla; sino deje vacio.",
      },
    },
    button: "Sign Up",
    footer: {
      text: "¿Ya tienes una cuenta?",
      link: "Login",
    },
  },
  selectCategory: {
    title: "Seleccione Categoria",
    subtitle:
      "Seleccione las categorias que usted desee. Cada categoria tiene un costo de 10 soles mensuales.",
    button: "Enviar peticion",
    totalText: "Seleccionar categorias para poder ver su costo total.",
    totalText1st: "Lo que usted seleccionó ",
    totalText2st: " Costo Total: ",
    totalText3st: "Mensual.",
  },
  admin: {
    routes: {
      dashboard: "Dashboard",
      categories: "Categories",
      sallers: "Sellers",
      products: "Products",
      subscriptionCheck: "Subscription-Check",
      requests: "Requests",
      logout: "Logout",
    },
    statisticPage: {
      totalProduct: "Total Product",
      totalCategory: "Total Category",
      totalSaller: "Total Seller",
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
      heading: "Sellers",
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
      heading: "Seller Products",
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
      heading: "Productos",
      searchPlaceholder: "Filtrar Productos...",
      tableHeadings: {
        name: "Nombre",
        image: "Imagen",
        location: "Ubicación",
        category: "Categoria",
        price: "Precio",
        createdAt: "Creado en",
        sallerName: "Nombre de la Tienda",
        action: "Action",
      },
      addProductButton: "Agregrar Producto",
      buttons: {
        next: "Siguiente",
        previous: "Anterior",
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
      heading: "Solicitar Nueva Categoria",
      searchPlaceholder: "Filtrar Categoria...",
      addButton: "Agregar Categoria",
      tableHeadings: {
        category: "Categoria",
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
      dashboard: "Panel de Control",
      myCategory: "Mi Categoria",
      product: "Producto",
      categoryRequest: "Solicitud de Categoria",
      logout: "Salir",
    },
    dashboardPage: {
      headings: {
        beforeDateText: "Su subscrinción terminará : ",
        afterDateText: "día",
      },
      cardTitels: {
        totalProduct: "Productos Totales",
        totalCategory: "Categorias totales",
      },
    },
    myCategoryPage: {
      heading: "Categoria",
      title: "Seleccione y controle sus categorias abajo ",
      buttonText: "Actualizar",
      footer: {
        heading: "Necesita más categorias?",
        contactNumber: "+51 956 284 975",
        beforeContactText:
          "En caso necesite incrementar e limite de categorias, no dude en contactarse con nosotros",
        afterContactText: "Para cualquier inquietud o ayuda, estamos atentos!",
      },
    },
    categoryRequestPage: {
      heading: "Solicitar nueva Categoria",
      fieldLabels: {
        categoryName: "Nombre de Categoria",
        numOfProduct: "Número de Productos",
      },
      buttonText: "Enviar solicitud",
    },
    addProductPage: {
      heading: "Agregar Producto",
      labels: {
        image: "Subir imagen de Producto",
        name: "Nombre",
        price: "Precio",
        category: "Categoria",
        description: "Descripción",
      },
      placeholder: {
        price: "Ingrese el precio (e.g., 50.00 soles)",
        image: "Click para buscar imagen",
      },
      buttonText: "Agregar Producto",
      selectError: "Usted puede seleccionar máximo 2 categorias!",
    },
    editProductPage: {
      heading: "Editar Producto",
      labels: {
        image: "cargar Image del Producto",
        name: "Nombre",
        price: "Precio",
        category: "Categoria",
        description: "Descripción",
      },
      buttonText: "Editar Producto",
      selectError: "Usted puede seleccionar máximo 2 categorias!!",
    },
  },
};

export default translate;
