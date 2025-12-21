import { getPayload } from "payload";
import config from "../payload.config";

const categories = [
  {
    name: "All",
    slug: "all",
  },
  {
    name: "Business & Money",
    color: "#FFB347",
    slug: "business-money",
    subcategories: [
      { name: "Accounting", slug: "accounting" },
      { name: "Entrepreneurship", slug: "entrepreneurship" },
      { name: "Gigs & Side Projects", slug: "gigs-side-projects" },
      { name: "Investing", slug: "investing" },
      { name: "Management & Leadership", slug: "management-leadership" },
      { name: "Marketing & Sales", slug: "marketing-sales" },
      { name: "Networking, Careers & Jobs", slug: "networking-careers-jobs" },
      { name: "Personal Finance", slug: "personal-finance" },
      { name: "Real Estate", slug: "real-estate" },
    ],
  },
  {
    name: "Software Development",
    color: "#7EC8E3",
    slug: "software-development",
    subcategories: [
      { name: "Web Development", slug: "web-development" },
      { name: "Mobile Development", slug: "mobile-development" },
      { name: "Game Development", slug: "game-development" },
      { name: "Programming Languages", slug: "programming-languages" },
      { name: "DevOps", slug: "devops" },
    ],
  },
  {
    name: "Writing & Publishing",
    color: "#D8B5FF",
    slug: "writing-publishing",
    subcategories: [
      { name: "Fiction", slug: "fiction" },
      { name: "Non-Fiction", slug: "non-fiction" },
      { name: "Blogging", slug: "blogging" },
      { name: "Copywriting", slug: "copywriting" },
      { name: "Self-Publishing", slug: "self-publishing" },
    ],
  },
  {
    name: "Other",
    slug: "other",
  },
  {
    name: "Education",
    color: "#FFE066",
    slug: "education",
    subcategories: [
      { name: "Online Courses", slug: "online-courses" },
      { name: "Tutoring", slug: "tutoring" },
      { name: "Test Preparation", slug: "test-preparation" },
      { name: "Language Learning", slug: "language-learning" },
    ],
  },
  {
    name: "Self Improvement",
    color: "#96E6B3",
    slug: "self-improvement",
    subcategories: [
      { name: "Productivity", slug: "productivity" },
      { name: "Personal Development", slug: "personal-development" },
      { name: "Mindfulness", slug: "mindfulness" },
      { name: "Career Growth", slug: "career-growth" },
    ],
  },
  {
    name: "Fitness & Health",
    color: "#FF9AA2",
    slug: "fitness-health",
    subcategories: [
      { name: "Workout Plans", slug: "workout-plans" },
      { name: "Nutrition", slug: "nutrition" },
      { name: "Mental Health", slug: "mental-health" },
      { name: "Yoga", slug: "yoga" },
    ],
  },
  {
    name: "Design",
    color: "#B5B9FF",
    slug: "design",
    subcategories: [
      { name: "UI/UX", slug: "ui-ux" },
      { name: "Graphic Design", slug: "graphic-design" },
      { name: "3D Modeling", slug: "3d-modeling" },
      { name: "Typography", slug: "typography" },
    ],
  },
  {
    name: "Drawing & Painting",
    color: "#FFCAB0",
    slug: "drawing-painting",
    subcategories: [
      { name: "Watercolor", slug: "watercolor" },
      { name: "Acrylic", slug: "acrylic" },
      { name: "Oil", slug: "oil" },
      { name: "Pastel", slug: "pastel" },
      { name: "Charcoal", slug: "charcoal" },
    ],
  },
  {
    name: "Music",
    color: "#FFD700",
    slug: "music",
    subcategories: [
      { name: "Songwriting", slug: "songwriting" },
      { name: "Music Production", slug: "music-production" },
      { name: "Music Theory", slug: "music-theory" },
      { name: "Music History", slug: "music-history" },
    ],
  },
  {
    name: "Photography",
    color: "#FF6B6B",
    slug: "photography",
    subcategories: [
      { name: "Portrait", slug: "portrait" },
      { name: "Landscape", slug: "landscape" },
      { name: "Street Photography", slug: "street-photography" },
      { name: "Nature", slug: "nature" },
      { name: "Macro", slug: "macro" },
    ],
  },
];

/**
 * Script para resetear y sembrar la base de datos (fresh)
 */
async function freshDatabase() {
  console.log("🔄 Iniciando fresh de base de datos (reset + seed)...");

  try {
    const payload = await getPayload({ config });

    // PASO 1: RESETEAR
    console.log("\n🗑️  PASO 1: Limpiando base de datos...");
    const collections = ["categories", "users", "media"];

    for (const collection of collections) {
      try {
        const items = await payload.find({
          collection: collection as any,
          limit: 1000,
          pagination: false,
        });

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

    // PASO 2: SEMBRAR
    console.log("\n🌱 PASO 2: Sembrando datos iniciales...");
    let totalCategories = 0;

    for (const category of categories) {
      const parentCategory = await payload.create({
        collection: "categories",
        data: {
          name: category.name,
          slug: category.slug,
          color: category.color || null,
          parent: null,
        },
      });

      console.log(`   ✅ Categoría creada: ${category.name}`);
      totalCategories++;

      if (category.subcategories) {
        for (const subcategory of category.subcategories) {
          await payload.create({
            collection: "categories",
            data: {
              name: subcategory.name,
              slug: subcategory.slug,
              parent: parentCategory.id,
            },
          });
          totalCategories++;
        }
      }
    }

    console.log(`\n✅ Fresh completado exitosamente!`);
    console.log(`   📊 Total de categorías creadas: ${totalCategories}`);
    process.exit(0);
  } catch (error: any) {
    console.error("❌ Error en fresh:", error.message);
    process.exit(1);
  }
}

freshDatabase();
