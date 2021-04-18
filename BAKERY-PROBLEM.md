###Task Overview

You own a bakery. You make several types of bread every day in both `PAN` and `ROUND Loaves`. 
You’ve decided to create yourself a single page web application to assist you in optimizing your oven space utilization.

You love Next.js and Material UI so you’ve decided to start from the Material + Next.js example project: https://github.com/mui-org/material-ui/tree/master/examples/nextjs
You want to optimize your bread batches as follows:

- There is a batch of each type of bread, and you make it in either pan or round loaf. 
- Every customer will get at least one product matching their exact specifications.
- You make as few round loaves as possible as they are less efficient in utilizing your square footage.

The web app interface should allow for the following:

- Define the specific types of bread you are making each day.
- Create a list of `unique customers` that each have an order consisting of the types of breads they want, 
  and which kind of loaf those breads will be `(PAN or ROUND)`.

Once orders are created, the app will then find the optimal arrangement to best satisfy your customers and your budget.

An example batch may be:

- You are cooking Sourdough, Whole grain, and Banana bread today and have three customers.
- `Customer 1` wants a `Sourdough` `round loaf`.
- `Customer 2` wants a `Whole grain` `pan loaf` and `Banana` `round loaf`.
- `Customer 3` wants a `Sourdough` `pan loaf` and `Whole grain` `round loaf`.

I will have to make all three breads in `round loaves`.

Some customer orders may be impossible to fill due to your peculiar restrictions: 
- You are cooking only Sourdough today and have two customers.
- `Customer 1` wants a `Sourdough` `round loaf`. 
- `Customer 2` wants a `Sourdough` `pan loaf`.
`No solution exists`, as you can only make one kind of loaf for each bread type. 
You will have to call your customers and get one to compromise.
