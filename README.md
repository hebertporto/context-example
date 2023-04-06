This Provide a basic example of how do I use useContext hook in React.

The overall idea here is:

- Add a Context folder to the app
- Place All context files in the Context folder
- Create a Context Provider Component, which will be used to wrap the app
- Create a Context Consumer Component, which will be used to consume the context
- Create a Context Hook, which will be used to consume the context
- Use the context hook inside the component to consume the context

Disclaimer:

#1 The use of the context should be well thought out, and not used for every single component in the app. It should be used only when the data is needed in multiple components, and the data is not changing frequently.

#2 Without well thought out use of the context, the app will be hard to maintain, and will be hard to debug and generate a lot of re-renders.
