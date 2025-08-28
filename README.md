# n8n-nodes-supabase-namespace

Este es un nodo comunitario de n8n que te permite trabajar con Supabase Vector Store con soporte extendido para esquemas personalizados y namespaces.

Supabase Vector Store es una base de datos vectorial que permite almacenar y buscar embeddings de documentos de manera eficiente, ideal para aplicaciones de IA y búsqueda semántica.

[n8n](https://n8n.io/) es una plataforma de automatización de flujos de trabajo con [licencia fair-code](https://docs.n8n.io/reference/license/).

[Instalación](#instalación)  
[Operaciones](#operaciones)  
[Credenciales](#credenciales)  
[Compatibilidad](#compatibilidad)  
[Uso](#uso)  
[Recursos](#recursos)  

## Instalación

Sigue la [guía de instalación](https://docs.n8n.io/integrations/community-nodes/installation/) en la documentación de nodos comunitarios de n8n.

## Operaciones

Este nodo soporta las siguientes operaciones:

- **Load**: Cargar un vector store existente de Supabase
- **Insert**: Insertar nuevos documentos en el vector store
- **Retrieve**: Recuperar documentos similares basados en consultas
- **Update**: Actualizar documentos existentes en el vector store
- **Retrieve as Tool**: Usar la recuperación como una herramienta en flujos de LangChain

## Características Principales

### 🗄️ Soporte para Esquemas Personalizados
- Utiliza esquemas de base de datos diferentes al esquema "public" por defecto
- Configuración flexible para entornos multi-tenant

### 🏷️ Sistema de Namespaces
- Particionamiento lógico de documentos
- Filtrado eficiente por namespace
- Opción para limpiar namespaces antes de insertar nuevos datos

### 🔍 Consultas Personalizadas
- Configuración de nombres de consulta personalizados
- Soporte para filtros de metadatos avanzados
- Integración nativa con LangChain

## Credenciales

Para usar este nodo, necesitas configurar las credenciales de Supabase:

### Prerrequisitos
1. Una cuenta en [Supabase](https://supabase.com/)
2. Un proyecto de Supabase configurado
3. Una base de datos PostgreSQL con la extensión `pgvector` habilitada

### Configuración de Credenciales
1. Ve a tu proyecto de Supabase
2. Navega a Settings > API
3. Copia tu **Project URL** (host)
4. Copia tu **service_role** key (no la anon key)
5. En n8n, configura las credenciales con:
   - **Host**: Tu Project URL
   - **Service Role**: Tu service_role key

### Estructura de Tabla Requerida
Tu tabla debe tener la siguiente estructura mínima:
```sql
CREATE TABLE your_table_name (
  id BIGSERIAL PRIMARY KEY,
  content TEXT,
  metadata JSONB,
  embedding vector(1536), -- o la dimensión de tus embeddings
  namespace TEXT -- columna para el sistema de namespaces
);
```

## Compatibilidad

- **Versión mínima de n8n**: 1.0.0
- **Versión mínima de Node.js**: 20.15
- **Versiones probadas**: n8n 1.0.0+

## Uso

### Configuración Básica
1. **Table Name**: Selecciona o escribe el nombre de tu tabla
2. **Use Custom Schema**: Activa si quieres usar un esquema diferente a "public"
3. **Schema**: Especifica el nombre del esquema (ej: "ai_docs", "user_data")
4. **Namespace**: Define un namespace para organizar tus documentos

### Casos de Uso Comunes

#### 📚 Gestión de Documentos por Cliente
```json
{
  "tableName": "documents",
  "schema": "client_data",
  "namespace": "cliente_123",
  "options": {
    "clearNamespace": true
  }
}
```

#### 🔍 Búsqueda Semántica
```json
{
  "tableName": "knowledge_base",
  "namespace": "product_docs",
  "options": {
    "queryName": "search_products",
    "metadataFilter": {
      "category": "electronics"
    }
  }
}
```

#### 🔄 Actualización de Datos
```json
{
  "tableName": "user_preferences",
  "schema": "user_profiles",
  "namespace": "user_456"
}
```

### Integración con LangChain
Este nodo se integra perfectamente con flujos de LangChain en n8n, permitiendo:
- Cadenas de razonamiento complejas
- Agentes conversacionales
- Sistemas de recomendación
- Análisis de documentos

## Recursos

* [Documentación de nodos comunitarios de n8n](https://docs.n8n.io/integrations/#community-nodes)
* [Documentación oficial de Supabase](https://supabase.com/docs)
* [Guía de pgvector](https://github.com/pgvector/pgvector)
* [Documentación de LangChain](https://python.langchain.com/docs/get_started/introduction)
* [Repositorio del proyecto](https://github.com/Nesticopng/n8n-nodes-supabase-namespace)

## Historial de Versiones

### v0.1.0 (Actual)
- ✅ Soporte básico para Supabase Vector Store
- ✅ Sistema de namespaces implementado
- ✅ Soporte para esquemas personalizados
- ✅ Operaciones CRUD completas
- ✅ Integración con LangChain
- ✅ Filtros de metadatos avanzados

## Contribuciones

Las contribuciones son bienvenidas! Por favor:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para más detalles.

## Autor

**Néstor Cano** - [nestor.cano.vielma@gmail.com](mailto:nestor.cano.vielma@gmail.com)

---

⭐ Si este nodo te es útil, ¡considera darle una estrella al repositorio!
