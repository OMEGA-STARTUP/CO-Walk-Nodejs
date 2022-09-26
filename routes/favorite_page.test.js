const app = require('../app');
const { sequelize } = require('../models');
const request = require('supertest');





describe("Music_favorite API",  ()=> {
 
     
    it("GET spread music",  (done) => {
        
        request(app)
            .get("/favorites")
            .set('ACCESS_TOKEN', 'Beerer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjAsInB3ZCI6ImNuZXd3IiwiaWF0IjoxNjY0MTg2MjE3LCJleHAiOjE2NjQzNTkwMTcsImlzcyI6IkxlZSJ9.jTy_FcpJjDE4D0tgHOQdQydvKfODkW4r_hzwRIZ1I1U')
            .expect(200)
            .end(done);
        });       
    it("PUT  delete  favorite_music",  (done) => {
        
        request(app)
                .put(`/favorites`)
                .set('ACCESS_TOKEN', 'Beerer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjAsInB3ZCI6ImNuZXd3IiwiaWF0IjoxNjY0MTg2MjE3LCJleHAiOjE2NjQzNTkwMTcsImlzcyI6IkxlZSJ9.jTy_FcpJjDE4D0tgHOQdQydvKfODkW4r_hzwRIZ1I1U')    
                .send({sound_id:'0'})
                .expect(200)
                .end(done);

    });
    it("GET  search  favorite_music",  (done) => {
        const background_sound_name = "소리"
        request(app)
                .get(`/favorites/${encodeURI(background_sound_name)}/search`)
                .set('ACCESS_TOKEN', 'Beerer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjAsInB3ZCI6ImNuZXd3IiwiaWF0IjoxNjY0MTg2MjE3LCJleHAiOjE2NjQzNTkwMTcsImlzcyI6IkxlZSJ9.jTy_FcpJjDE4D0tgHOQdQydvKfODkW4r_hzwRIZ1I1U')    
                .send({sound_id:0})
                .expect(200)
                .end(done);            
      });
      it("GET  play music",  (done) => {
        const background_sound_id = 3
       request(app)
            .get(`/favorites/${background_sound_id}/play`)
            .set('ACCESS_TOKEN', 'Beerer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjAsInB3ZCI6ImNuZXd3IiwiaWF0IjoxNjY0MTg2MjE3LCJleHAiOjE2NjQzNTkwMTcsImlzcyI6IkxlZSJ9.jTy_FcpJjDE4D0tgHOQdQydvKfODkW4r_hzwRIZ1I1U')    
            .expect(200)
            .end(done);
                
      });




    });