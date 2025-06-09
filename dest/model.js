export function jsonToTodosModel(jsonString) {
    try {
        const parsed = JSON.parse(jsonString);
        if (!parsed || !Array.isArray(parsed.categories)) {
            throw new Error('Invalid TodosModel structure ');
        }
        return parsed;
    }
    catch (error) {
        console.log("error" + error);
        return null;
    }
}
export function todosModelToJson(todosModel) {
    return JSON.stringify(todosModel);
}
