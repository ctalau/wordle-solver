import Response from '../Response.mjs';
import assert from 'assert/strict';


describe('Response', function() {
    it('should be empty initially', function() {
        var response = new Response();
        assert.equal(response.toString(), '_____');
    });
    
    it('should set to green a slot', function() {
        var response = new Response();
        response.setGreen(1);
        assert.equal(response.toString(), '_g___');
    });

    it('should set to yellow a slot', function() {
        var response = new Response();
        response.setYellow(4);
        assert.equal(response.toString(), '____y');
    });

    it('should report if a slot is none', function() {
        var response = new Response();
        response.setYellow(4);
        assert.equal(response.isNone(4), false);
        assert.equal(response.isNone(2), true);
    });

});