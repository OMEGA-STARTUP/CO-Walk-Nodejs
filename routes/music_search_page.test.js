const app = require('../app');
const { sequelize } = require('../models');
const request = require('supertest');





describe("Music_search API",  ()=> {
    // * GET
     
      it("GET spread music",  (done) => {
        
        request(app)
            .get("/background-sounds")
            .set('ACCESS_TOKEN', 'Beerer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjAsInB3ZCI6ImNuZXd3IiwiaWF0IjoxNjY0MDkwNDI5LCJleHAiOjE2NjQxMjY0MjksImlzcyI6IkxlZSJ9.UqdvqCmEYqmCVUmWggw301t0EveCQK4ZKcGvEai1KxE')
            .expect(200)
            .end(done);
            
        });

      it("GET  search music",  (done) => {
        const background_sound_name = "해변"
       request(app)
            .get(`/background-sounds/${encodeURI(background_sound_name)}/search`)
            .set('ACCESS_TOKEN', 'Beerer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjAsInB3ZCI6ImNuZXd3IiwiaWF0IjoxNjY0MDkwNDI5LCJleHAiOjE2NjQxMjY0MjksImlzcyI6IkxlZSJ9.UqdvqCmEYqmCVUmWggw301t0EveCQK4ZKcGvEai1KxE')    
            .expect(200)
            .end(done);      
      });

      it("GET  play music",  (done) => {
        const background_sound_id = 3
       request(app)
            .get(`/background-sounds/${background_sound_id}/play`)
            .set('ACCESS_TOKEN', 'Beerer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjAsInB3ZCI6ImNuZXd3IiwiaWF0IjoxNjY0MDkwNDI5LCJleHAiOjE2NjQxMjY0MjksImlzcyI6IkxlZSJ9.UqdvqCmEYqmCVUmWggw301t0EveCQK4ZKcGvEai1KxE')    
            .expect(200)
            .end(done);
                
      });

      it("POST  favorite music",  (done) => {
        const background_sound_id = 3
       request(app)
            .post(`/background-sounds/${background_sound_id}/favorite`)
            .set('ACCESS_TOKEN', 'Beerer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjAsInB3ZCI6ImNuZXd3IiwiaWF0IjoxNjY0MDkwNDI5LCJleHAiOjE2NjQxMjY0MjksImlzcyI6IkxlZSJ9.UqdvqCmEYqmCVUmWggw301t0EveCQK4ZKcGvEai1KxE')    
            .send({is_favorite:'false'})
            .expect(200)
            .end(done);
                
      });







      });
