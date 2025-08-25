export class MicroDB {
  static async cargarMicroorganismos() {
    const res = await fetch("microorganismos.json");
    const data = await res.json();
    return data;
  }
}
