const ProjectService = require ('../services/ProjectService')

module.exports = {
    searchALL: async (req, res)=>{
        let json = {error: '', result: []}

        let projects = await ProjectService.searchALL()

        for(let i in projects){
            json.result.push({
                id: projects[i].id,
                img: projects[i].img,
                title: projects[i].title,
                descript: projects[i].descript,
                descript_ptbr: projects[i].descript_ptbr,
                url: projects[i].url,
                download: projects[i].download
            })
        }
        res.json(json)
    },
    searchONE: async (req, res)=>{
        let json = {error: '', result: []}
        let id = req.params.id
        let project = await ProjectService.searchONE(id)

        if(project){
            json.result = project
        }
        res.json(json)
    },
    insert: async (req, res)=>{
        let json = {error: '', result: []}
        
        let title = req.body.title
        let descript = req.body.descript
        let url = req.body.url
        let download = req.body.download
        let img = req.body.img

        if(img && title && descript && url && download){
            let project_ID = await ProjectService.insert(img, title, descript, url, download)
            json.result = {
                id: project_ID,
                img,
                title,
                descript,
                url,
                download
            }
        }else {
            json.error = 'Campos não enviados';
        }
        res.json(json)
    },
    edit: async (req, res)=>{
        let json = {error: '', result: []}
        
        let id = req.params.id
        let title = req.body.title
        let descript = req.body.descript
        let url = req.body.url
        let download = req.body.download
        let img = req.body.img

        if(id && img && title && descript && url && download){
            await ProjectService.edit(id, img,title, descript, url, download)
            json.result = {
                id,
                img,
                title,
                descript,
                url,
                download,
            }
        }else {
            json.error = 'Campos não enviados';
        }
        res.json(json)
    },
    delete: async (req, res)=>{
        let json = {error: '', result: []}
        
        await ProjectService.delete(req.params.id)

        res.json(json)
    },
}