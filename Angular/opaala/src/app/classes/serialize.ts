export class Serialize {
    static serialize<T>(data: object[]): T[] {
       return data.map(item => ({ ...item }) as T);
    }
 }
 