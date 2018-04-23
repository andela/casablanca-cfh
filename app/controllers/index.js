exports.play = (req, res) => {
  let { regionId } = req.query;
  if (regionId === null || undefined) {
    regionId = 1;
  }
  if (req.query.custom === 'true') {
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

