export interface TodoModel {
    name: string,
    date: string,
    time: string,
    isCompleted:boolean
}
export interface CategoryModel {
    name: string,
    todos: Array<TodoModel>
}
export interface TodosModel {
    categories: Array<CategoryModel>
}

export function jsonToTodosModel(jsonString: string): TodosModel | null {
    try {
        const parsed = JSON.parse(jsonString);
        if (!parsed || !Array.isArray(parsed.categories)) {
            throw new Error('Invalid TodosModel structure ');
        }
        return parsed as TodosModel;
    } catch (error) {
        console.log("error" + error)
        return null;
    }
}

export function todosModelToJson(todosModel: TodosModel): string {
    return JSON.stringify(todosModel);
}