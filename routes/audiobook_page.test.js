const app = require('../app');
const { sequelize } = require('../models');
const request = require('supertest');


let token = "Beerer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjAsInB3ZCI6ImNuZXd3IiwiaWF0IjoxNjY0MzQ2NzQzLCJleHAiOjE2NjQ1MTk1NDMsImlzcyI6IkxlZSJ9.9daxgboO5ICx4jd-7AucvNSjncBNOL6iF_nSKF2u_k8"


describe("AudioBook API",  ()=> {

    it("GET spread audiobook",  (done) => {
        
            request(app)
                .get("/audiobooks")
                .set('ACCESS_TOKEN',token)
                .expect(200)
                .end(done);
        }); 

    it("GET select sounds of audio_book",  (done) => {
            const audio_book_title = "change_book"
            request(app)
                .get(`/audiobooks/${audio_book_title}`)
                .set('ACCESS_TOKEN', token)
                .expect(200)
                .end(done);
            });

    it("POST create audiobook",  (done) => {
            const audio_book_title = "solo"
            request(app)
                .post(`/audiobooks/${audio_book_title}`)
                .set('ACCESS_TOKEN', token)
                .expect(200)
                .end(done);
                });

    it("DELETE delete audiobook",  (done) => {
        const audio_book_title = "solo"
        request(app)
             .delete(`/audiobooks/${audio_book_title}`)
             .set('ACCESS_TOKEN', token)
             .expect(200)
             .end(done);
                        });

    it("PUT change audiobook_name",  (done) => {
            const audio_book_title = "aucio12"
            request(app)
                .put(`/audiobooks/${audio_book_title}`)
                .set('ACCESS_TOKEN', token)
                .send({revised_audio_book_title:'changed_solo'})
                .expect(200)
                .end(done);
                            });

    it("POST Add music to audiobook",  (done) => {
            const audio_book_title = "changed_solo"
            const sound_id = 0
            request(app)
                .post(`/audiobooks/${audio_book_title}/background-sounds/${sound_id}`)
                .set('ACCESS_TOKEN', token)
                .expect(200)
                .end(done);
                            });

    it("PUT Delete music to audiobook",  (done) => {
            const audio_book_title = "change_book"
            const sound_id =2
            request(app)
                .put(`/audiobooks/${audio_book_title}/background-sounds/${sound_id}`)
                .set('ACCESS_TOKEN', token)
                .expect(200)
                .end(done);
                            });

    it("GET Play music to audiobook",  (done) => {
            const background_sound_id = 6
            const audio_book_title = "change_book"
            request(app)
                .get(`/audiobooks/${audio_book_title}/background-sounds/${background_sound_id}/play`)
                .set('ACCESS_TOKEN', token)
                .expect(200)
                .end(done);
                            });                           



});