import { getPayload } from "payload";
import config from "../payload.config";

/**
 * Script para resetear (limpiar) todas las colecciones de la base de datos
 */
async function resetDatabase() {
  console.log("🔄 Iniciando reseteo de base de datos...");

  try {
    const payload = await getPayload({ config });

    // Obtener todas las colecciones (excepto las internas de Payload)
    const collections = ["categories", "users", "media"];

    for (const collection of collections) {
      try {
        console.log(`🗑️  Limpiando colección: ${collection}`);
        
        // Obtener todos los documentos
        const items = await payload.find({
          collection: collection as any,
          limit: 1000,
          pagination: false,
        });

        // Eliminar cada documento
        if (items.docs.length > 0) {
          for (const item of items.docs) {
            await payload.delete({
              collection: collection as any,
              id: item.id,
            });
          }
          console.log(`   ✅ ${items.docs.length} documentos eliminados de ${collection}`);
        } else {
          console.log(`   ℹ️  ${collection} ya está vacía`);
        }
      } catch (error: any) {
        console.log(`   ⚠️  Error limpiando ${collection}: ${error.message}`);
      }
    }

    console.log("\n✅ Base de datos reseteada exitosamente");
    process.exit(0);
  } catch (error: any) {
    console.error("❌ Error reseteando la base de datos:", error.message);
    process.exit(1);
  }
}

resetDatabase();
