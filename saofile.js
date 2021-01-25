
module.exports = {
  prompts() {
    return [
      {
        name: 'name',
        message: 'What is the name of the Cloudflare worker?',
        default: this.outFolder,
        filter: val => val.toLowerCase()
      },
      {
        name: 'cf_account',
        message: 'What is your Cloudflare account id?',
        store: true
      },
      {
        name: 'workers_dev',
        type : 'confirm',
        message: 'Deploy to workers.dev domain? (useful if you don\'t already have a domain set up)',
        default: true,
        store: true
      },
      {
        name: 'domain',
        message: 'What is the domain you wish to deply to?',
        when: answers => !answers.workers_dev
      },
      {
        name: 'zone_id',
        message: 'What is the Cloudflare zone id for this domain?',
        when: answers => !answers.workers_dev
      },
      {
        name: 'origin_host',
        message: 'What is the domain of your origin site?',
      },
      {
        name: 'origin_at_root',
        type : 'confirm',
        message: 'Is your origin site hosted at the root of this domain?',
        default: true
      },
      {
        name: 'path_prefix',
        type : 'boolean',
        message: 'Enter a path prefix for the pages of your site',
        default: answers => answers.name + "/",
        when : answers => !answers.origin_at_root
      },
    ]
  },
  actions: [
    {
      type: 'add',
      files: '**'
    },
    {
      type: 'move',
      patterns: {
        gitignore: '.gitignore',
        github: '.github'
      }
    }
  ],
  async completed() {
    this.gitInit()
    await this.npmInstall()
    this.showProjectTips()
  }
}
