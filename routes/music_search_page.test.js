const app = require('../app');
const { sequelize } = require('../models');
const request = require('supertest');





describe("Music_search API",  ()=> {
    // * GET
     
      it("GET spread music",  (done) => {
        
        request(app)
            .get("/background-sounds")
            .set('ACCESS_TOKEN', 'Beerer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjAsInB3ZCI6ImNuZXd3IiwiaWF0IjoxNjY0MDM2NDU4LCJleHAiOjE2NjQwNzI0NTgsImlzcyI6IkxlZSJ9.C52SD57JK_5hcX-TZWKeV-qsX-C9HOvHNgcHYfXvsqo')
            .expect(200)
            .end(done);
            
        });

      it("GET  search music",  (done) => {
        const background_sound_name = "해변"
       request(app)
            .get(`/background-sounds/${encodeURI(background_sound_name)}/search`)
            .set('ACCESS_TOKEN', 'Beerer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjAsInB3ZCI6ImNuZXd3IiwiaWF0IjoxNjY0MDM2NDU4LCJleHAiOjE2NjQwNzI0NTgsImlzcyI6IkxlZSJ9.C52SD57JK_5hcX-TZWKeV-qsX-C9HOvHNgcHYfXvsqo')    
            .expect(200)
            .end(done);
                
      });



      });
