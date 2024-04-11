using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TacoTuesday.Models;

namespace TacoTuesday.Controllers
{
    // All of these routes will be at the base URL:     /api/Reviews
    // That is what "api/[controller]" means below. It uses the name of the controller
    // in this case ReviewsController to determine the URL
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewsController : ControllerBase
    {
        // This is the variable you use to have access to your database
        private readonly DatabaseContext _context;

        // Constructor that receives a reference to your database context
        // and stores it in _context for you to use in your API methods
        public ReviewsController(DatabaseContext context)
        {
            _context = context;
        }


        // PUT: api/Reviews/5
        //
        // Update an individual review with the requested id. The id is specified in the URL
        // In the sample URL above it is the `5`. The "{id} in the [HttpPut("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        // In addition the `body` of the request is parsed and then made available to us as a Review
        // variable named review. The controller matches the keys of the JSON object the client
        // supplies to the names of the attributes of our Review POCO class. This represents the
        // new values for the record.
        //
        [HttpPut("{id}")]
        public async Task<IActionResult> PutReview(int id, Review review)
        {
            // If the ID in the URL does not match the ID in the supplied request body, return a bad request
            if (id != review.Id)
            {
                return BadRequest();
            }

            // Tell the database to consider everything in review to be _updated_ values. When
            // the save happens the database will _replace_ the values in the database with the ones from review
            _context.Entry(review).State = EntityState.Modified;

            try
            {
                // Try to save these changes.
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                // Ooops, looks like there was an error, so check to see if the record we were
                // updating no longer exists.
                if (!ReviewExists(id))
                {
                    // If the record we tried to update was already deleted by someone else,
                    // return a `404` not found
                    return NotFound();
                }
                else
                {
                    // Otherwise throw the error back, which will cause the request to fail
                    // and generate an error to the client.
                    throw;
                }
            }

            // Return a copy of the updated data
            return Ok(review);
        }

        // POST: api/Reviews
        //
        // Creates a new review in the database.
        //
        // The `body` of the request is parsed and then made available to us as a Review
        // variable named review. The controller matches the keys of the JSON object the client
        // supplies to the names of the attributes of our Review POCO class. This represents the
        // new values for the record.
        //
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<Review>> PostReview(Review review)
        {
            // Set the UserID to the current user id, this overrides anything the user specifies.
            review.UserId = GetCurrentUserId();

            // Indicate to the database context we want to add this new record
            _context.Reviews.Add(review);
            await _context.SaveChangesAsync();

            // Return a response that indicates the object was created (status code `201`) and some additional
            // headers with details of the newly created object.
            return CreatedAtAction("GetReview", new { id = review.Id }, review);
        }

        // DELETE: api/Reviews/5
        //
        // Deletes an individual review with the requested id. The id is specified in the URL
        // In the sample URL above it is the `5`. The "{id} in the [HttpDelete("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReview(int id)
        {
            // Find this review by looking for the specific id
            var review = await _context.Reviews.FindAsync(id);
            if (review == null)
            {
                // There wasn't a review with that id so return a `404` not found
                return NotFound();
            }

            // Tell the database we want to remove this record
            _context.Reviews.Remove(review);

            // Tell the database to perform the deletion
            await _context.SaveChangesAsync();

            // Return a copy of the deleted data
            return Ok(review);
        }

        // Private helper method that looks up an existing review by the supplied id
        private bool ReviewExists(int id)
        {
            return _context.Reviews.Any(review => review.Id == id);
        }

        // Private helper method to get the JWT claim related to the user ID
        private int GetCurrentUserId()
        {
            // Get the User Id from the claim and then parse it as an integer.
            return int.Parse(User.Claims.FirstOrDefault(claim => claim.Type == "Id").Value);
        }
    }
}
