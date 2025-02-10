import express from 'express';
import exphbs from 'express-handlebars';

import connection from './db/connection.mjs';
import User from './models/User.mjs';

const app = express();

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', async (req, res) => {

  const users = await User.findAll({ raw: true });
  res.render('home', { users: users });

});

app.get('/users/create', async(req, res) => {
  res.render('createUser');
});

app.post('/users/create', async (req, res) => {

  const { name, occupation } = req.body;
  let newsLetter = req.body.newsLetter;

  if(newsLetter === 'on') {
    newsLetter = true;
  }
  newsLetter = false;

  await User.create(
    {
      name,
      occupation,
      newsLetter
    }
  );

  res.redirect('/');
});

app.get('/users/:id', async(req, res) => {
  const id = req.params.id;

  const user = await User.findOne({ raw: true, where: { id: id } });

  res.render('userView', { user });
});

app.post('/users/delete/:id', async (req, res) => {
  const id = req.params.id;

  await User.destroy({
    where: {
      id: id
    }
  })
    .then((user) => {
      console.log(user);
      res.redirect('/');
    })
    .catch((err) => {
      console.log(err);
    });

});

app.get('/users/edit/:id', async (req, res) => {
  const id = req.params.id;

  const user = await User.findOne({
    raw: true,
    where: {
      id: id
    }
  });
  res.render('userEdit', { user });
});

app.post('/users/update', async (req, res) => {
  const { id, name, occupation } = req.body;
  let newsLetter = req.body.newsLetter;

  if(newsLetter === 'on') {
    newsLetter = true;
  } else {
    newsLetter = false;
  }

  const userData = {
    id,
    name,
    occupation,
    newsLetter
  };

  await User.update(userData, { where: { id: id } });

  res.redirect('/');
});

connection
  .sync()
  .then(() => {
    app.listen(3000, () => {
      console.log('Servidor rodando em: http://localhost:3000');
    });
  })
  .catch((err) => {
    console.log(err);
  });
