import {
    Meteor
} from 'meteor/meteor';
import {
    Questions
} from './questions.js';
import {
    Random
} from 'meteor/random';
import {
    assert
} from 'meteor/practicalmeteor:chai';

//Note to Jared: edit this test integration test (behavioral)
if (Meteor.isServer) {
    describe('Questions', () => {
        describe('methods', () => {
            const qID = Random.id();
            let questionId;

            beforeEach(() => {
                Questions.remove({});
                questionId = Questions.insert({
                    text: 'What is a test question?',
                    opt: optTF,
                });
            });

            it('can delete owned question', () => {
                const deleteQuestion = Meteor.server.method_handlers['questions.remove'];
                const invocation = {
                    qID
                };

                deleteQuestion.apply(invocation, [questionId]);

                assert.equal(Questions.find().count(), 0);
            });
        });
    });
}