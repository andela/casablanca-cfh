exports.play = (req, res) => {
  const { regionId } = req.query;
  if (Object.keys(req.query)[0] === 'custom') {
    res.redirect(`/#!/app?custom&region=${regionId}`);
  } else {
    res.redirect(`/#!/app?region=${regionId}`);
  }
};

exports.render = (req, res) => {
  res.render('index', {
    user: req.user ? JSON.stringify(req.user) : 'null'
  });
};
