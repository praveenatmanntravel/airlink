const SIA = require('./_/providers/SIA/')
module.exports = {
    index: (req, res, next) => {
        console.log('in search interface, do:index')
        res.send('index')
    },
    view: (req, res, next) => {
        console.log('in search interface, do:view')
        res.send('view')
    },
    getResult: async (req, res, next) => {
        var search_param = req.query;
        var response = await SIA.search(search_param)
        console.log('in search interface, do:search')
        res.json(response)
    }
}