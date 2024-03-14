function manageBuilder() {
    const envBuildInstruction = ENV.getVar("BUILD_INSTRUCTION");
    const action = actionsDefined[envVarValue] || manageError<RuntimeError>(RuntimeError, "BuildInstructions not availble")
    action()
}

const actionsDefined = {
    null: manageError<RuntimeError>(RuntimeError, "BuildInstructions not available"),
    loader: apiLoader,
    builder: apiBuilder
}
