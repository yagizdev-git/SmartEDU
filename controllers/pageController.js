exports.getIndexPage = (req, res) => {
  res.status(200).render('index', {
    pageName: 'index'
  })
};

exports.getAboutPage = (req, res) => {
  res.status(200).render('about', {
    pageName: 'about'
  });
};

exports.getCoursesPage = (req, res) => {
  res.status(200).render('courses', {
    pageName: 'courses'
  })
};

exports.getRegisterPage = (req, res) => {
  res.status(200).render('register', {
    pageName: 'register',
  });
}

// exports.getDashboardPage = (req,res) => {
//   res.status(200).render('dashboard', {
//     pageName: 'dashboard'
//   })
// };

// exports.getContactPage = (req,res) => {
//   res.status(200).render('contact', {
//     pageName: 'contact'
//   })
// };