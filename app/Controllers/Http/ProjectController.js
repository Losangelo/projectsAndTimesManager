'use strict';

const Project = use ('App/Models/Project');

class ProjectController {
  /* Listando os projetos */
  async index({request}) {
    const {page} = request.get ();
    const projects = await Project.query ()
      .with ('user')
      .with ('tasks')
      .paginate (page);
    return projects;
  }

  /* para pegar o usuario logado, usa-se o auth nos params */
  async store({request, auth}) {
    const data = request.only (['title', 'description']);
    const project = await Project.create ({...data, user_id: auth.user.id});
    return project;
  }

  async show({params, response}) {
    try {
      const project = await Project.findOrFail (params.id);

      return project;
    } catch (err) {
      return response
        .status (err.status)
        .send ({error: {message: 'Projeto não encontrado!'}});
    }
  }

  async update({params, request, response}) {
    try {
      const project = await Project.findOrFail (params.id);
      const data = request.only (['title', 'description']);
      project.merge (data);
      await project.save ();
      return project;
    } catch (err) {
      return response
        .status (err.status)
        .send ({error: {message: 'Projeto não encontrado!'}});
    }
  }

  async destroy({params, request, response}) {
    try {
      const project = await Project.findOrFail (params.id);

      await project.delete ();
    } catch (err) {
      return response
        .status (err.status)
        .send ({error: {message: 'Projeto não encontrado!'}});
    }
  }
}

module.exports = ProjectController;
