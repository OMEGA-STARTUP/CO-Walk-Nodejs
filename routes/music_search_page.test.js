const app = require('../app');
const { sequelize } = require('../models');
const request = require('supertest');





describe("Music_search API",  ()=> {
 
     
      it("GET spread music",  (done) => {
        
        request(app)
            .get("/background-sounds")
            .set('ACCESS_TOKEN', 'Beerer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjAsInB3ZCI6ImNuZXd3IiwiaWF0IjoxNjY0MTg2MjE3LCJleHAiOjE2NjQzNTkwMTcsImlzcyI6IkxlZSJ9.jTy_FcpJjDE4D0tgHOQdQydvKfODkW4r_hzwRIZ1I1U')
            .expect(200)
            .end(done);
            
        });

      it("GET  search music",  (done) => {
        const background_sound_name = "해변"
       request(app)
            .get(`/background-sounds/${encodeURI(background_sound_name)}/search`)
            .set('ACCESS_TOKEN', 'Beerer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjAsInB3ZCI6ImNuZXd3IiwiaWF0IjoxNjY0MTg2MjE3LCJleHAiOjE2NjQzNTkwMTcsImlzcyI6IkxlZSJ9.jTy_FcpJjDE4D0tgHOQdQydvKfODkW4r_hzwRIZ1I1U')    
            .expect(200)
            .end(done);      
      });

      it("GET  play music",  (done) => {
        const background_sound_id = 3
       request(app)
            .get(`/background-sounds/${background_sound_id}/play`)
            .set('ACCESS_TOKEN', 'Beerer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjAsInB3ZCI6ImNuZXd3IiwiaWF0IjoxNjY0MTg2MjE3LCJleHAiOjE2NjQzNTkwMTcsImlzcyI6IkxlZSJ9.jTy_FcpJjDE4D0tgHOQdQydvKfODkW4r_hzwRIZ1I1U')    
            .expect(200)
            .end(done);
                
      });

      it("POST  favorite music",  (done) => {
        const background_sound_id = 3
       request(app)
            .post(`/background-sounds/${background_sound_id}/favorite`)
            .set('ACCESS_TOKEN', 'Beerer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjAsInB3ZCI6ImNuZXd3IiwiaWF0IjoxNjY0MTg2MjE3LCJleHAiOjE2NjQzNTkwMTcsImlzcyI6IkxlZSJ9.jTy_FcpJjDE4D0tgHOQdQydvKfODkW4r_hzwRIZ1I1U')    
            .send({is_favorite:'false'})
            .expect(200)
            .end(done);
                
      });

      });
