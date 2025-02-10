import express from 'express';
import exphbs from 'express-handlebars';

import connection from './db/connection.mjs';
import User from './models/User.mjs';
import Address from './models/Address.mjs';

const app = express();

app.engine('handlebars', exphbs.engine());

app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Helpers
const hbs = exphbs.create({
  helpers: {
    gt: function (a, b) {
      return a > b;
    }
  }
});

app.engine('handlebars', hbs.engine);

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

app.get('/users/:id', async (req, res) => {
  const id = req.params.id;

  const user = await User.findOne({
    where: { id: id },
    include: { model: Address } // Inclui os endereços relacionados
  });

  if (!user) {
    return res.status(404).send('Usuário não encontrado');
  }

  res.render('userView', { user: user.get({ plain: true }) });
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

  try {
    const user = await User.findOne({
      include: Address,
      where: {
        id: id,
      },
    });
    res.render('userEdit', { user: user.get({ plain: true }) });
  } catch (error) {
    console.log(error);
  }
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

app.post('/address/create', (req, res) => {
  const UserId = req.body.UserId;
  const street = req.body.street;
  const number = req.body.number;
  const city = req.body.city;

  const address = {
    street,
    number,
    city,
    UserId,
  };

  Address.create(address)
    .then(res.redirect(`/users/${UserId}`))
    .catch((err) => console.log(err));
});

app.post('/address/delete', async (req, res) => {
  const { id } = req.body;
  try {
    const address = await Address.findOne({ where: { id } });

    if (!address) {
      return res.status(404).send('Endereço não encontrado.');
    }

    await Address.destroy({
      where: { id }
    });

    res.redirect(`/users/${address.UserId}`);
  } catch (error) {
    console.error('Erro ao deletar endereço:', error);
    res.status(500).send('Erro ao deletar o endereço.');
  }
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
