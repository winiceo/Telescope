_.forEach(Telescope.email.emails, (email, key) => {
  Picker.route(email.path, (params, req, res) => {

    let html;

    // if email has a custom way of generating test HTML, use it
    if (typeof email.getTestHTML !== "undefined") {

      html = email.getTestHTML.bind(email)(params);

    } else {

      // else get test object (sample post, comment, user, etc.)
      const testObject = email.getTestObject(params._id);

      // get test object's email properties
      const properties = email.getProperties(testObject);

      // then apply email template to properties, and wrap it with buildTemplate
      html = Telescope.email.buildTemplate(Telescope.email.getTemplate(email.template)(properties));

    }

    // return html
    res.end(html);
  
  });
});