import express from 'express';

const courseGoals = [];

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send(`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Learn HTMX</title>
      <link rel="stylesheet" href="/main.css" />
      <script src="/htmx.js" defer></script>
    </head>
    <body>
      <main>
        <h1>Manage your course goals</h1>
        <section>
          <form 
          id="goal-form"
           hx-post="/goals"
           hx-target="ul"
           hx-swap="outerHTML"
           hx-select="ul"
           >
            <div>
              <label htmlFor="goal">Goal</label>
              <input type="text" id="goal" name="goal" />
            </div>
            <button type="submit">Add goal</button>
          </form>
        </section>
        <section>
          <ul id="goals">
          ${courseGoals.map(
            (goal, index) => `
            <li id="goal-${index}">
              <span>${goal}</span>
              <button
                hx-delete="/goals/${index}" 
                hx-target="#goal-${index}"
                hx-swap="outerHTML">
                  Remove
                </button>
            </li>
          `
          ).join('')}
          </ul>
        </section>
      </main>
    </body>
  </html>
  `);
});

app.post("/goals",(req,res) => {
  const newGoal = req.body.goal;
  courseGoals.unshift(newGoal);
  res.redirect("/");
})

app.delete("/goals/:idx" ,(req,res) => {
  const index = req.params.idx;
  console.log(index);
  courseGoals.splice(index,1);
  res.send();
});

app.listen(3000);
