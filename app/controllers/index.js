exports.play = (req, res) => {
  let { regionId } = req.query;
  if (regionId === null || undefined) {
    regionId = 1;
  }
  if (Object.keys(req.query)[0] === 'custom') {
    res.redirect('/#!/app?custom');
  } else {
    res.redirect(`/#!/app?region=${regionId}`);
  }
};

exports.render = (req, res) => {
  res.render('index', {
    user: req.user ? JSON.stringify(req.user) : 'null'
  });
};

