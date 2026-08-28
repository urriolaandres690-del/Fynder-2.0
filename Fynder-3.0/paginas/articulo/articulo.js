// ── articulo.js ──

// ── Seed de comentarios predefinidos por artículo ──
const ARTICLE_SEED_COMMENTS = {
  "1": [
    { name:"Valentina Torres", initial:"V", colorIdx:0, text:"Exactamente lo que necesitaba leer. Llevo meses con mi negocio de repostería y nunca me había animado a dar el paso digital. Hoy mismo registro mi perfil en FYNDER. Gracias por el empujón.", date:"12 jun 2026", likes:34 },
    { name:"Marcos Delgado", initial:"M", colorIdx:2, text:"El dato del 87% me dejó sin palabras. Yo pensaba que mis clientes llegaban por recomendación boca a boca, pero mi hija me mostró que muchos me buscan en Google antes de venir. Era hora de actualizar.", date:"13 jun 2026", likes:27 },
    { name:"Sandra Reyes", initial:"S", colorIdx:3, text:"Llevo 3 semanas con mi perfil completo en FYNDER y ya noto la diferencia. Recibo consultas de personas que nunca hubieran sabido que existo. Un 23% más de clientes en 6 meses es muy realista, yo lo estoy viviendo.", date:"11 jun 2026", likes:41 },
    { name:"Pedro Alvarado", initial:"P", colorIdx:4, text:"Lo que más me costó fue pedir reseñas a los clientes. Me daba pena. Pero una vez que empecé, fue como abrir una llave. Ahora tengo 18 reseñas y eso genera confianza automática.", date:"14 jun 2026", likes:19 },
    { name:"Gabriela Moreno", initial:"G", colorIdx:1, text:"Punto 3 sobre activar redes sociales: totalmente de acuerdo. Me concentré solo en Instagram y en 2 meses dupliqué mis pedidos de catering. No hay que estar en todas partes, hay que estar bien en una.", date:"10 jun 2026", likes:23 },
    { name:"Roberto Jiménez", initial:"R", colorIdx:5, text:"Artículo muy práctico. Muchos hablan de transformación digital como si fuera algo complicadísimo. La verdad es que con una hora un sábado puedes tener tu presencia online lista. No hay excusas.", date:"15 jun 2026", likes:31 },
    { name:"Camila Vásquez", initial:"C", colorIdx:0, text:"Comparto esto con mi mamá que tiene una tienda de artesanías. Ella siempre dice que eso de internet no es para ella, pero artículos como este demuestran que sí puede hacerlo.", date:"9 jun 2026", likes:16 },
    { name:"Andrés Fuentes", initial:"A", colorIdx:2, text:"El punto de las fotos de calidad es clave. Tengo un colega que tiene el mejor producto del barrio pero sus fotos son oscuras y borrosas. Nadie hace clic en eso. La presentación lo es todo.", date:"12 jun 2026", likes:38 },
    { name:"Isabel Castillo", initial:"I", colorIdx:3, text:"Yo agregaría un paso 5: mantener la información actualizada. Nada frustra más a un cliente que llegar y encontrar que el horario que vio online estaba incorrecto. Eso destruye confianza.", date:"13 jun 2026", likes:29 },
    { name:"Felipe Navarro", initial:"F", colorIdx:1, text:"Mi ferretería cumplió 40 años este año. Mis hijos me convencieron de entrar a FYNDER y en el primer mes recibí llamadas de clientes de colonias que ni sabía que quedaban cerca. Increíble.", date:"8 jun 2026", likes:52 },
    { name:"Lucía Ramírez", initial:"L", colorIdx:4, text:"El 23% más de clientes en 6 meses... yo pensé que era exagerado, pero mi vecina que tiene una papelería dice que fue exactamente su experiencia. A veces los números son reales.", date:"11 jun 2026", likes:14 },
    { name:"Diego Herrera", initial:"D", colorIdx:5, text:"La clave está en ser constante. No sirve registrarte y olvidarte. Hay que responder mensajes, actualizar los horarios, subir fotos nuevas. Un perfil activo genera confianza.", date:"14 jun 2026", likes:22 },
    { name:"Natalia Rojas", initial:"N", colorIdx:0, text:"Cuánta razón con lo de la generación entera. Mis sobrinos nunca van a un lugar que no pueden buscar antes online. Si no apareces, no existes para ellos. Así de simple.", date:"10 jun 2026", likes:45 },
    { name:"Ernesto Paz", initial:"E", colorIdx:2, text:"Pasé de 4 mesas ocupadas en promedio a lleno completo los fines de semana. Lo único que cambié fue completar mi perfil y subir fotos del menú. Costo: cero. Resultado: impresionante.", date:"7 jun 2026", likes:67 },
    { name:"Mónica Silva", initial:"M", colorIdx:3, text:"Artículo muy bien escrito, sin tecnicismos innecesarios. Perfecto para compartir con emprendedores de toda edad. Lo estoy enviando al grupo de WhatsApp de mi asociación de comerciantes.", date:"15 jun 2026", likes:18 },
    { name:"Tomás Aguilar", initial:"T", colorIdx:1, text:"Una cosa que agregaría: no tengan miedo a las reseñas negativas. Una respuesta amable y profesional a una crítica dice más de tu negocio que 10 reseñas perfectas.", date:"12 jun 2026", likes:36 },
    { name:"Patricia Leal", initial:"P", colorIdx:5, text:"Gracias por mencionar que no necesitas presupuesto ni conocimientos técnicos. Hay mucho miedo injustificado. Mi hija de 65 años registró su costurería en 15 minutos. ¡Funciona!", date:"9 jun 2026", likes:43 }
  ],
  "2": [
    { name:"Carmen Espinoza", initial:"C", colorIdx:3, text:"La razón 3 me llegó al corazón. Siempre supe que comprar local era mejor pero ver el dato concreto del 68% vs 28% es devastador. Desde hoy cambio mis hábitos de consumo.", date:"8 jun 2026", likes:58 },
    { name:"Hernán Quispe", initial:"H", colorIdx:1, text:"Trabajo en un restaurante local de 25 años en el barrio. Este artículo describe exactamente lo que hacemos: recetas de la abuela, ingredientes frescos del mercado municipal, clientes que son familia. Gracias por valorarlo.", date:"9 jun 2026", likes:71 },
    { name:"Rosa Mendoza", initial:"R", colorIdx:4, text:"Lo del trato personalizado es exactamente por qué vuelvo siempre al mismo restaurante. Don Aurelio ya sabe que no como cilantro y siempre me lo dice cuando lo tienen en algún plato. Eso no lo hace ninguna cadena.", date:"7 jun 2026", likes:49 },
    { name:"Javier Ortega", initial:"J", colorIdx:0, text:"Trabajé años en una franquicia multinacional. Los ingredientes viajan congelados desde bodegas a miles de kilómetros. Lo que describes del restaurante local es 100% real: la diferencia en sabor es abismal.", date:"10 jun 2026", likes:83 },
    { name:"Alicia Soto", initial:"A", colorIdx:2, text:"Ese sancocho de gallina que mencionan... hay un señor en mi barrio que lo hace desde hace 30 años. No hay restaurante lujoso que se le acerque. Es patrimonio culinario puro.", date:"8 jun 2026", likes:62 },
    { name:"Miguel Ángel Torres", initial:"M", colorIdx:5, text:"Razón 5, la más importante para mí. Cuando apoyé al restaurante de mi vecina durante la pandemia, ella pudo mantener su negocio. Cuando yo la necesité, fue la primera en aparecer. La comunidad se sostiene sola.", date:"9 jun 2026", likes:94 },
    { name:"Esperanza Lima", initial:"E", colorIdx:3, text:"Fui a un restaurante local nuevo por recomendación de FYNDER y resultó ser el mejor almuerzo que he comido en años. El chef tiene 60 años cocinando la misma receta. Eso es calidad sin atajos.", date:"11 jun 2026", likes:37 },
    { name:"Ricardo Paredes", initial:"R", colorIdx:1, text:"El punto de las recetas únicas es poderoso. Una cadena de pizzas nunca tendrá la pizza rellena con queso local que hace mi tía. Hay sabores que solo existen en un lugar del mundo.", date:"7 jun 2026", likes:55 },
    { name:"Daniela Cruz", initial:"D", colorIdx:0, text:"Compartí esto con mis compañeras de trabajo y ahora tenemos un reto semanal: lunch de restaurante local. Ha sido una aventura gastronómica increíble. Llevamos 6 semanas y no repetimos.", date:"10 jun 2026", likes:28 },
    { name:"Carlos Medina", initial:"C", colorIdx:4, text:"Dueño de restaurante local aquí. Leer esto desde nuestro lado da mucha fuerza. Hay semanas difíciles pero saber que hay personas que valoran lo que hacemos es el combustible que necesitamos.", date:"8 jun 2026", likes:112 },
    { name:"Fernanda Vidal", initial:"F", colorIdx:2, text:"Lo de los ingredientes más frescos lo compruebo cada semana. El aguacate del mercado local vs el del supermercado de cadena es noche y día. Y el restaurante local lo sabe y lo usa.", date:"9 jun 2026", likes:41 },
    { name:"Pablo Robles", initial:"P", colorIdx:5, text:"Punto 3 sobre el dinero en la comunidad: esto se llama efecto multiplicador y es economía básica. ¿Por qué no lo enseñan en las escuelas? Cada peso que se queda local, trabaja dos veces.", date:"11 jun 2026", likes:76 },
    { name:"Gloria Pacheco", initial:"G", colorIdx:3, text:"Hay un restaurante en mi cuadra que tiene el mejor caldo de res que he probado en mi vida. Lo mantiene doña Josefina con 78 años. Cuando ya no esté, ese sabor desaparece para siempre. Por eso hay que apoyarlos ahora.", date:"8 jun 2026", likes:89 },
    { name:"Sebastián Vargas", initial:"S", colorIdx:0, text:"Me convenciste completamente. Cancelé mi subscripción a la app de delivery de cadenas y ahora solo pido a restaurantes locales verificados en FYNDER. En un mes no he comido nada malo.", date:"10 jun 2026", likes:33 },
    { name:"Adriana Molina", initial:"A", colorIdx:1, text:"La atención personalizada que describe el artículo es real. En el café de abajo me conocen, saben mi pedido y a veces me guardan el último croissant. Eso no tiene precio ni app que lo replique.", date:"9 jun 2026", likes:47 }
  ],
  "3": [
    { name:"Eduardo Salinas", initial:"E", colorIdx:0, text:"Lo hice siguiendo exactamente estos pasos y en literalmente 8 minutos tenía mi taller de carpintería publicado. Primera semana: 3 clientes nuevos del barrio norte que nunca me hubieran encontrado.", date:"3 jun 2026", likes:44 },
    { name:"Mariela Contreras", initial:"M", colorIdx:2, text:"El consejo de la descripción clara es oro puro. Yo primero puse algo genérico y casi no recibía consultas. Lo reescribí siendo específica sobre mis servicios de limpieza y todo cambió.", date:"4 jun 2026", likes:31 },
    { name:"José Antonio Ríos", initial:"J", colorIdx:5, text:"Paso 4, publicar. Suena simple pero cuántos procrastinamos eso. Lo estuve pensando dos semanas. Cuando finalmente lo hice, el mismo día recibí un mensaje de un cliente. Ojalá lo hubiera hecho antes.", date:"2 jun 2026", likes:56 },
    { name:"Verónica Guzmán", initial:"V", colorIdx:3, text:"El tip de actualizar horarios en festivos es fundamental. Yo perdí un cliente potencial porque mi perfil decía que abría el 1 de enero y estaba cerrada. Desde entonces lo actualizo siempre.", date:"5 jun 2026", likes:38 },
    { name:"Guillermo Peña", initial:"G", colorIdx:1, text:"Tengo 52 años y no soy muy bueno con la tecnología. Pero este proceso fue tan sencillo que lo hice solo. En serio, si yo pude, cualquiera puede. FYNDER lo pensó bien.", date:"3 jun 2026", likes:67 },
    { name:"Lorena Ibáñez", initial:"L", colorIdx:4, text:"El consejo de responder rápido a los contactos es clave. He notado que cuando respondo en menos de una hora, el cliente casi siempre concreta. Si demoro más de un día, ya no contestan.", date:"4 jun 2026", likes:29 },
    { name:"Raúl Montoya", initial:"R", colorIdx:0, text:"Registré mi clínica veterinaria hace 2 meses. Ahora recibo consultas de toda la zona. Antes dependía solo del boca a boca. Completar el perfil al 100% como dice el artículo fue la diferencia.", date:"2 jun 2026", likes:52 },
    { name:"Catalina Flores", initial:"C", colorIdx:2, text:"Paso 2, la descripción. Me tomó 45 minutos redactar algo que realmente me representara. Pero ese tiempo valió oro. Los clientes me dicen que eligieron mi servicio porque la descripción era clara y honesta.", date:"5 jun 2026", likes:41 },
    { name:"Mauricio Estrada", initial:"M", colorIdx:5, text:"El punto de las fotos de calidad mencionado en los consejos finales es lo que más impacto tuvo en mi caso. Contraté a un estudiante de fotografía por 2 horas y transformó mi perfil completamente.", date:"3 jun 2026", likes:63 },
    { name:"Silvia Bravo", initial:"S", colorIdx:3, text:"Llevo el registro de mis clientes y el 34% del último mes me dijo que llegó por FYNDER. Antes ese número era cero porque no existía en internet. No es magia, es visibilidad como dice el artículo.", date:"4 jun 2026", likes:48 },
    { name:"Alejandro Ureña", initial:"A", colorIdx:1, text:"Registré mi negocio en el paso 1. Encontré una errata en mi dirección en el paso 2 y la corregí a tiempo. Si el cliente llega a una dirección equivocada, la primera impresión ya está destruida. Gracias por el énfasis en los detalles.", date:"5 jun 2026", likes:22 },
    { name:"Beatriz Chaves", initial:"B", colorIdx:4, text:"Lo recomiendo a todos mis conocidos emprendedores. El proceso es exactamente como lo describe el artículo: simple, rápido y con resultados inmediatos. No hay excusa para no hacerlo.", date:"2 jun 2026", likes:35 },
    { name:"Óscar Ramírez", initial:"O", colorIdx:0, text:"Soy técnico en refrigeración. Antes el 100% de mis clientes eran referidos. Ahora el 40% llega por FYNDER. Eso significa que estoy llegando a personas que no tenían ningún técnico de confianza. Nuevo mercado, puro crecimiento.", date:"4 jun 2026", likes:71 },
    { name:"Xiomara Pinto", initial:"X", colorIdx:2, text:"Gracias por explicar también los beneficios de agregar redes sociales al perfil. Yo no lo había hecho y cuando lo agregué, mi Instagram de costura creció 200 seguidores en una semana.", date:"3 jun 2026", likes:39 },
    { name:"Arturo Leiva", initial:"A", colorIdx:5, text:"2 minutos suena exagerado pero es verdad. Yo cronometré: 1 minuto 47 segundos. El formulario es muy intuitivo. Lo difícil es pensar qué escribir en la descripción, lo cual deberías tener claro antes.", date:"5 jun 2026", likes:27 }
  ],
  "4": [
    { name:"Sofía Henríquez", initial:"S", colorIdx:3, text:"Lo de la consulta inicial es tan verdad. Fui a un salón nuevo y la estilista tomó el tiempo de revisar mi historial de tinte, preguntar qué productos uso, cómo reacciona mi cabello al calor. Eso fue antes de cobrarme un centavo. Claramente una profesional.", date:"29 may 2026", likes:73 },
    { name:"Valentina Muñoz", initial:"V", colorIdx:0, text:"Las reseñas específicas son la clave. Busco salones filtrando por 'keratina' o 'tinte' y leo esas reseñas específicas. Las generales no dicen nada. Las específicas dicen todo.", date:"30 may 2026", likes:45 },
    { name:"Andrea Peñaloza", initial:"A", colorIdx:4, text:"Encontré mi salón actual por FYNDER hace 4 meses. Las fotos eran increíbles, las reseñas específicas sobre tratamientos eran todas positivas y quedaba a 8 minutos de mi casa. Llevo 4 visitas y cada una mejor que la anterior.", date:"28 may 2026", likes:61 },
    { name:"Paola Santamaría", initial:"P", colorIdx:2, text:"El punto de la limpieza e instrumentos desinfectados no debería ser un plus, debería ser mínimo. Pero tristemente no siempre se cumple. Una vez vi tijeras sin limpiar en un salón de cadena y nunca volví.", date:"31 may 2026", likes:38 },
    { name:"Renata Figueroa", initial:"R", colorIdx:1, text:"20 años buscando el estilista ideal. Lo encontré hace 6 meses gracias a FYNDER. La clave fue leer las reseñas detalladas de otros clientes sobre el mismo servicio que yo buscaba. Exactamente como lo describe el artículo.", date:"29 may 2026", likes:84 },
    { name:"Carla Espejo", initial:"C", colorIdx:5, text:"La especialidad importa muchísimo. Yo tenía cabello rizado y fui a un salón generalista que lo planchó como si fuera lacio. Fue un desastre. Ahora solo voy a especialistas en cabello rizado y es diferente mundo.", date:"30 may 2026", likes:97 },
    { name:"María José Ugarte", initial:"M", colorIdx:3, text:"El ambiente lo dice todo. Un salón limpio, ordenado, con buena música y sin pelitos en el suelo... eso ya me dice que el equipo es profesional antes de que me toquen el cabello.", date:"28 may 2026", likes:52 },
    { name:"Tatiana Lozano", initial:"T", colorIdx:0, text:"Busqué en FYNDER salones especializados en coloración balayage cerca de mí. Encontré tres opciones, comparé perfiles y reseñas, y elegí una. Fue la mejor coloración que me han hecho. El artículo da exactamente el método correcto.", date:"31 may 2026", likes:43 },
    { name:"Laura del Río", initial:"L", colorIdx:4, text:"Lo de pedir el diagnóstico antes es algo que aplico siempre ahora. Una vez un estilista me quiso aplicar decoloración sin preguntar nada sobre mi historial. Me negué y bien que hice, tenía el cabello dañado por un tinte anterior.", date:"29 may 2026", likes:69 },
    { name:"Fernanda Castañeda", initial:"F", colorIdx:2, text:"El artículo me abrió los ojos sobre por qué me sentía insatisfecha en mi salón anterior. No hacían diagnóstico previo, el ambiente era caótico y nunca especializaron. Todo check negativo según este artículo.", date:"30 may 2026", likes:34 },
    { name:"Cristina Vega", initial:"C", colorIdx:1, text:"Dueña de salón aquí. Me alegra ver artículos que educan a los clientes sobre qué buscar. Eso nos obliga a los buenos profesionales a destacar y elimina la competencia desleal de los que no tienen formación.", date:"28 may 2026", likes:78 },
    { name:"Daniela Ospina", initial:"D", colorIdx:5, text:"El filtro de 'Belleza' en FYNDER me salvó. Antes gastaba tiempo buscando en redes sociales sin orden. Ahora filtro, comparo fotos del trabajo real y leo reseñas. En 10 minutos tengo mi cita agendada.", date:"31 may 2026", likes:29 },
    { name:"Juliana Torres", initial:"J", colorIdx:3, text:"Encontré una microblading artist certificada por FYNDER que queda a 15 minutos. Sus reseñas eran específicas y detalladas. Resultado: perfectas cejas y una nueva clienta fiel.", date:"29 may 2026", likes:56 },
    { name:"Alejandra Rivas", initial:"A", colorIdx:0, text:"Consejo extra: pregunta siempre qué marcas de productos usan. Un salón que usa productos profesionales de calidad lo dirá con orgullo. Uno que usa lo más barato cambiará el tema.", date:"30 may 2026", likes:47 },
    { name:"Pilar Guerrero", initial:"P", colorIdx:4, text:"Esto debería leerlo toda persona antes de ir a un salón por primera vez. Me hubiera ahorrado tres decepciones y pelo dañado. Ahora aplico cada punto y mi cabello lo agradece.", date:"28 may 2026", likes:91 }
  ],
  "5": [
    { name:"Kevin Arce", initial:"K", colorIdx:1, text:"La garantía escrita es innegociable para mí. Una vez un técnico sin local fijo me reparó el cargador del laptop. Sin garantía. A los 3 días lo mismo. Sin poder reclamar nada. Aprendí la lección.", date:"26 may 2026", likes:63 },
    { name:"Sebastián Chacón", initial:"S", colorIdx:4, text:"Técnico en electrónica aquí. Confirmo todo lo del artículo. Los buenos técnicos locales tienen certificaciones, usan repuestos originales o de primera calidad, y cobran justo. Las cadenas cobran el doble por calidad de segunda.", date:"27 may 2026", likes:88 },
    { name:"Brandon Mora", initial:"B", colorIdx:0, text:"Llevé mi iPhone 13 a un técnico local que encontré en FYNDER. Diagnóstico gratis en 20 minutos. Repuesto original. Garantía de 60 días. El precio fue 40% menos que el centro autorizado de la cadena. No vuelvo al otro.", date:"25 may 2026", likes:102 },
    { name:"Mateo Solano", initial:"M", colorIdx:2, text:"El dato de preguntar el tipo de piezas es fundamental. Hay pantallas 'compatibles' que duran 2 semanas y pantallas originales que duran años. La diferencia en precio es de $15. La diferencia en calidad es abismal.", date:"26 may 2026", likes:47 },
    { name:"Alejandro Quirós", initial:"A", colorIdx:5, text:"Tengo una tienda de reparación de celulares cerca de mi casa. Antes nunca lo noté. Desde que uso FYNDER sé exactamente dónde ir cuando algo se rompe. Antes cruzaba la ciudad hasta un centro comercial.", date:"27 may 2026", likes:34 },
    { name:"Daniel Vindas", initial:"D", colorIdx:3, text:"Lo del diagnóstico gratuito es algo que pocos ofrecen pero que diferencia a los serios. Si un técnico quiere cobrarte solo por revisar el equipo, ya sabes que no confía en su propio trabajo.", date:"25 may 2026", likes:71 },
    { name:"Esteban Monge", initial:"E", colorIdx:1, text:"Mi laptop cayó al piso y la pantalla quedó rota. Encontré un técnico certificado en FYNDER a 5 minutos de mi trabajo. La reparó en 2 horas, con piezas originales Dell, garantía de 90 días. Precio: exactamente la mitad del servicio técnico oficial.", date:"26 may 2026", likes:95 },
    { name:"Roberto Fallas", initial:"R", colorIdx:4, text:"La parte de evitar cadenas de reparación masivas es real. Trabajé en una durante un año. Los técnicos tienen incentivos para cobrar más y la calidad de repuestos varía según el lote que llegó ese mes. No es consistente.", date:"27 may 2026", likes:57 },
    { name:"Luis Guido", initial:"L", colorIdx:0, text:"Filtré 'Tecnología' en FYNDER, leí reseñas y encontré un técnico que tiene 47 reseñas de 5 estrellas. Ese nivel de historial verificado no te lo da ningún volante en la calle.", date:"25 may 2026", likes:42 },
    { name:"José Pablo Brenes", initial:"J", colorIdx:2, text:"El artículo menciona 30 a 90 días de garantía. Mi técnico actual da 120 días. Eso me dice que confía absolutamente en su trabajo. Ya llevo 4 reparaciones con él y ningún problema.", date:"26 may 2026", likes:68 },
    { name:"Adrián Chaves", initial:"A", colorIdx:5, text:"Un tip adicional: lleva siempre el equipo con al menos 20% de batería para que el técnico pueda hacer pruebas antes y después de la reparación. Un buen técnico siempre hace esa verificación contigo presente.", date:"27 may 2026", likes:31 },
    { name:"Christian Salas", initial:"C", colorIdx:3, text:"Busqué reparación de consola PS5 en FYNDER y encontré un técnico especialista que ni sabía que existía. Joystick drift resuelto en 3 horas por $18. El servicio oficial Sony: $120 y 3 semanas. No hay comparación.", date:"25 may 2026", likes:114 },
    { name:"Marco Zamora", initial:"M", colorIdx:1, text:"La transparencia del diagnóstico es lo que más valoro. Mi técnico me muestra exactamente qué falló, me explica por qué, me enseña la pieza dañada y la nueva. Siento que estoy pagando con información, no a ciegas.", date:"26 may 2026", likes:53 },
    { name:"Randall Alpízar", initial:"R", colorIdx:4, text:"Cuántas veces fui a grandes cadenas y el técnico ni te miraba a los ojos. El local que encontré en FYNDER me recibe por mi nombre, me pregunta qué pasó antes de abrir el equipo. Eso se llama servicio.", date:"27 may 2026", likes:39 }
  ],
  "6": [
    { name:"Ana Lucía Badilla", initial:"A", colorIdx:2, text:"El efecto multiplicador del dinero local es lo que más me impactó. Nunca había pensado que mi café de la mañana en la panadería local genera el doble de impacto económico que el mismo café en una cadena internacional. Desde hoy cambio.", date:"20 may 2026", likes:82 },
    { name:"Mauricio Jiménez", initial:"M", colorIdx:0, text:"Economista aquí. El dato del 68% de retención local vs 28% en franquicias es exacto y está bien documentado. Lo que rara vez se menciona es el efecto secundario: el dinero retenido localmente genera más empleos locales adicionales.", date:"21 may 2026", likes:124 },
    { name:"Priscilla Ulate", initial:"P", colorIdx:4, text:"Lo del impacto medioambiental me abrió los ojos. Nunca había pensado en los kilómetros que viaja el pan del supermercado. Desde que compro en la panadería de mi cuadra incluso noto que el pan dura más fresco. Lógico: menos tiempo en tránsito.", date:"19 may 2026", likes:59 },
    { name:"Rodrigo Hernández", initial:"R", colorIdx:3, text:"El 60-80% de empleos nuevos generados por pequeños negocios locales es el dato que más deberíamos repetir. Cada vez que preferimos una franquicia, estamos votando contra el empleo de calidad en nuestra propia comunidad.", date:"20 may 2026", likes:97 },
    { name:"Karina Solís", initial:"K", colorIdx:1, text:"Hice el ejercicio propuesto al final: antes de comprar en Amazon o un supermercado, buscar primero en FYNDER. La semana pasada encontré una librería local que tiene un catálogo impresionante a mejores precios. Calidad y comunidad ganaron.", date:"21 may 2026", likes:44 },
    { name:"Fabiana Mora", initial:"F", colorIdx:5, text:"La resiliencia de comunidades con negocios locales diversificados es algo que vivimos en pandemia. Las ciudades con economías locales fuertes se recuperaron antes. Eso no es coincidencia, es economía comunitaria funcionando.", date:"19 may 2026", likes:78 },
    { name:"Alejandro Rojas", initial:"A", colorIdx:2, text:"Artículo que debería ser obligatorio en cualquier clase de educación cívica o economía. El consumo consciente no es un lujo ecológico, es responsabilidad ciudadana con impacto real y medible.", date:"20 may 2026", likes:65 },
    { name:"Carolina Méndez", initial:"C", colorIdx:0, text:"Lo que más me llegó fue el punto de la diversidad económica. Cuando depende todo de una cadena grande y cierra, el barrio muere. Cuando hay 10 negocios pequeños, el barrio sobrevive siempre.", date:"21 may 2026", likes:53 },
    { name:"Víctor Alvarado", initial:"V", colorIdx:4, text:"Microeconomía pura y simple, muy bien explicada para el público general. Comparto esto mensualmente en mi empresa para promover el consumo local entre mis empleados. El impacto colectivo es enorme.", date:"19 may 2026", likes:41 },
    { name:"Marta Arias", initial:"M", colorIdx:3, text:"Llevo un año comprometida a comprar local siempre que puedo. Mi barrio ha cambiado: abrieron 3 negocios nuevos en la cuadra. Coincidencia? No creo. El dinero que se queda activa la economía local.", date:"20 may 2026", likes:87 },
    { name:"Estela Campos", initial:"E", colorIdx:1, text:"El dato de la cadena de suministro más corta y menor huella de carbono es poderoso. Fácil de entender y fácil de actuar. No necesitas calcular nada complejo: si es local, el camino fue más corto.", date:"21 may 2026", likes:36 },
    { name:"Nicolás Pereira", initial:"N", colorIdx:5, text:"Emprendedor local aquí. Leer artículos como este nos da energía para seguir. A veces la lucha contra las grandes cadenas parece imposible. Pero si los consumidores entienden el impacto de sus decisiones, hay esperanza real.", date:"19 may 2026", likes:143 },
    { name:"Gabriela Vega", initial:"G", colorIdx:2, text:"El punto sobre empleos de calidad con horarios humanos y cercanía al hogar me resonó. Mi esposo trabajaba en una cadena de retail con horarios imposibles. Ahora trabaja en una ferretería local a 3 cuadras. Diferente calidad de vida totalmente.", date:"20 may 2026", likes:71 },
    { name:"Iván Mora", initial:"I", colorIdx:0, text:"Datos como los del Institute for Local Self-Reliance deberían salir en periódicos de primera plana. En vez de eso están en artículos de blog que la gente comprometida comparte. Ojalá llegue a más personas.", date:"21 may 2026", likes:48 },
    { name:"Vanessa Quirós", initial:"V", colorIdx:4, text:"Hice el reto de la semana y busqué todo en FYNDER primero. Resultado: encontré un vivero local, una ferretería especializada en herramientas antiguas y una heladería artesanal. Todo nuevo para mí, todo en mi misma ciudad.", date:"19 may 2026", likes:62 }
  ],
  "7": [
    { name:"Natalia Vargas", initial:"N", colorIdx:1, text:"Foto 4 del equipo humano: esto cambió todo en mi negocio. Antes subía solo fotos del producto. Cuando subí una foto de mi equipo sonriente, las consultas se duplicaron en esa semana. La gente compra a personas, no a logos.", date:"16 may 2026", likes:87 },
    { name:"Jorge Soto", initial:"J", colorIdx:3, text:"Lo del lente del celular me parece un tip subestimado. Limpié el lente de mi iPhone y retomé las mismas fotos de siempre. La diferencia fue brutal. Fotos nítidas vs fotos con esa neblina que ni notaba.", date:"17 may 2026", likes:65 },
    { name:"Marcela Arias", initial:"M", colorIdx:0, text:"Foto 5, el proceso en acción, fue mi mayor descubrimiento. Subí un video corto haciendo mis arreglos florales y se convirtió en mi post más visto. A la gente le fascina ver cómo se hace lo que compran.", date:"15 may 2026", likes:74 },
    { name:"Sebastián Rojas", initial:"S", colorIdx:4, text:"Contraté a un estudiante de fotografía como menciona el artículo. $30 por 2 horas. Resultado: 12 fotos profesionales que transformaron mi perfil. Inversión con el mejor ROI que he hecho en mi negocio.", date:"16 may 2026", likes:91 },
    { name:"Camila Herrera", initial:"C", colorIdx:2, text:"La foto de la fachada salvó mi negocio. Tenía clientes que llegaban confundidos porque mi local no tiene rótulo grande. Con la foto de la fachada en el perfil, la primera cosa que me dicen es 'ah, te reconocí de inmediato'.", date:"17 may 2026", likes:43 },
    { name:"Andrea Castro", initial:"A", colorIdx:5, text:"Lo de fotografiar los detalles únicos (punto 7) es brillante. Mi pastelería tiene una pared de azulejos vintage que es el alma del local. Esa foto sola genera más emociones que las fotos del producto. El ambiente vende.", date:"15 may 2026", likes:56 },
    { name:"Diego Núñez", initial:"D", colorIdx:1, text:"Tengo una ferretería. Nunca pensé que las fotos importaban en mi rubro. Un asesor me convenció de subir fotos del local ordenado, los productos bien exhibidos y el equipo. Subí 40% de consultas en ese mes.", date:"16 may 2026", likes:38 },
    { name:"Laura Méndez", initial:"L", colorIdx:3, text:"El consejo de tomar varias opciones para elegir la mejor es algo que cambió mi proceso. Antes tomaba una foto y ya. Ahora tomo 10 y elijo la mejor. Sin costo adicional, con resultado incomparablemente mejor.", date:"17 may 2026", likes:29 },
    { name:"Felipe Mora", initial:"F", colorIdx:0, text:"La foto del producto estrella (punto 3) es sagrada. Dediqué una tarde entera a fotografiar mi pizza especial con buena luz natural, en el plato correcto y con el ángulo exacto. Esa foto es el 60% de mis pedidos por FYNDER.", date:"15 may 2026", likes:103 },
    { name:"Karla Blanco", initial:"K", colorIdx:4, text:"Llevo 2 años subiendo fotos a mi perfil según estos principios sin saberlo. Instintivamente hacía lo correcto. Leer el artículo me ayudó a entender POR QUÉ funcionaba y a ser más intencional.", date:"16 may 2026", likes:47 },
    { name:"Mario Alpízar", initial:"M", colorIdx:2, text:"La foto del ambiente interior es lo que más me pregunta la gente antes de reservar mi salón de eventos. 'Cómo se ve por dentro' es la pregunta #1. Desde que subí fotos del interior decorado, las reservas aumentaron notablemente.", date:"17 may 2026", likes:61 },
    { name:"Roxana Vindas", initial:"R", colorIdx:5, text:"El tip de la luz natural es el más valioso y el más gratuito. Mi cocina tiene una ventana grande y fotografiar mis platillos a las 10am con esa luz es magia pura. Sin filtros, sin edición. Solo buena luz.", date:"15 may 2026", likes:84 },
    { name:"Pablo Zamora", initial:"P", colorIdx:1, text:"Foto de clientes felices (punto 6): siempre pido permiso y casi siempre me dicen que sí. Esas fotos son autenticidad pura. Ningún estudio profesional puede replicar la cara de satisfacción real de un cliente.", date:"16 may 2026", likes:72 },
    { name:"Silvia Montero", initial:"S", colorIdx:3, text:"Implementé los 7 tipos de fotos en mi papelería. En orden. Una por semana. Al final de las 7 semanas mi perfil era irreconocible de lo bueno que se veía. Los clics se multiplicaron por 4. Método probado.", date:"17 may 2026", likes:119 },
    { name:"Armando Vega", initial:"A", colorIdx:0, text:"Agrego un tip 8: la foto antes/después si tienes un servicio de transformación. Mi taller de restauración de muebles antes no tenía fotos. Cuando subí comparativas del estado original vs restaurado, los encargos se dispararon.", date:"15 may 2026", likes:93 },
    { name:"Melissa Porras", initial:"M", colorIdx:4, text:"Estudiante de fotografía aquí. Gracias por mencionar que pueden contratar estudiantes. Muchos de nosotros buscamos portafolio y cobramos muy accesible. Salen ganando todos: el negocio con fotos profesionales, nosotros con experiencia.", date:"16 may 2026", likes:55 }
  ]
};

function _seedArticleComments(articleId) {
  const key = 'fynderComments_' + articleId;
  // Sembrar si no existe la clave O si el array guardado está vacío
  const existing = localStorage.getItem(key);
  if(existing !== null) {
    try {
      const parsed = JSON.parse(existing);
      if(Array.isArray(parsed) && parsed.length > 0) return;
    } catch(e) {}
  }
  const seed = ARTICLE_SEED_COMMENTS[articleId];
  if(!seed) return;
  // Asignar IDs únicos basados en timestamp ficticio
  const base = 1700000000000;
  const seeded = seed.map((c, i) => ({
    ...c,
    id: String(base + i * 60000),
    likes: c.likes || 0
  }));
  localStorage.setItem(key, JSON.stringify(seeded));
}


function openArticle(id) {
  const articles = {
    "1": {
      title: "Cómo llevar tu negocio local al siguiente nivel con presencia digital",
      category: "Emprendimiento", color: "#67B8B4",
      author: "Ana Martínez", authorInitial: "A", authorGrad: "135deg,#67B8B4,#2F5BB7",
      date: "15 jun 2026", readTime: "5 min",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&h=450&fit=crop&auto=format",
      body: `<p>En un mundo cada vez más conectado, tener visibilidad digital ya no es opcional para los negocios locales. Los estudios muestran que el <strong>87% de los consumidores</strong> busca información en línea antes de visitar un negocio físico.</p>
<h3>¿Por qué importa la presencia digital?</h3>
<p>Un negocio sin presencia en internet es prácticamente invisible para una generación entera de consumidores. Sin embargo, estar en línea no significa tener una web costosa o compleja. Plataformas como FYNDER te dan visibilidad inmediata y gratuita.</p>
<h3>Pasos para empezar hoy mismo</h3>
<p><strong>1. Registra tu negocio en FYNDER.</strong> Es gratis, toma menos de 2 minutos y te coloca frente a miles de usuarios locales que buscan exactamente lo que ofreces.</p>
<p><strong>2. Completa tu perfil al 100%.</strong> Agrega fotos de calidad, horarios actualizados y una descripción clara de tus servicios. Los negocios con perfiles completos reciben hasta 3 veces más visitas.</p>
<p><strong>3. Activa tus redes sociales.</strong> No necesitas estar en todas. Elige una o dos plataformas donde esté tu cliente ideal y publica de forma constante.</p>
<p><strong>4. Pide reseñas a tus clientes.</strong> Las opiniones positivas son el mejor marketing que existe. Un cliente satisfecho que deja una reseña vale oro.</p>
<h3>El impacto real de dar el salto digital</h3>
<p>Los negocios que dan el salto digital reportan en promedio un <strong>23% más de clientes</strong> en los primeros 6 meses. No es magia, es visibilidad. Cuando alguien en tu ciudad busca lo que vendes, tú apareces.</p>
<p>FYNDER fue creado exactamente para esto: eliminar las barreras digitales para los emprendedores locales. No necesitas saber de tecnología, no necesitas presupuesto. Solo necesitas empezar.</p>`
    },
    "2": {
      title: "5 razones para preferir los restaurantes de tu barrio",
      category: "Gastronomía", color: "#EF4444",
      author: "Carlos Vega", authorInitial: "C", authorGrad: "135deg,#EF4444,#F97316",
      date: "10 jun 2026", readTime: "4 min",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&h=450&fit=crop&auto=format",
      body: `<p>Cadenas internacionales y franquicias dominan el paisaje gastronómico urbano. Sin embargo, los restaurantes locales tienen algo que ninguna cadena puede replicar: <strong>alma, historia e ingredientes del territorio</strong>.</p>
<h3>1. Ingredientes más frescos</h3>
<p>Los restaurantes locales suelen abastecerse de mercados y productores cercanos. Eso se traduce en ingredientes más frescos, más nutritivos y con mejor sabor que los productos procesados a escala industrial.</p>
<h3>2. Recetas únicas e irrepetibles</h3>
<p>Detrás de cada plato hay una historia familiar, una tradición que se ha pasado de generación en generación. Es imposible encontrar ese sancocho de gallina o esa sopa de frijoles en ningún otro lugar del mundo.</p>
<h3>3. Tu dinero se queda en la comunidad</h3>
<p>Estudios económicos demuestran que el <strong>68% del dinero gastado</strong> en negocios locales permanece circulando en la comunidad, frente al 43% en cadenas nacionales y apenas el 28% en franquicias internacionales.</p>
<h3>4. Atención personalizada</h3>
<p>En el restaurante de tu barrio, el dueño te conoce por tu nombre, recuerda que no te gusta el picante y sabe cuál es tu plato favorito. Ese nivel de atención es imposible de escalar en una franquicia.</p>
<h3>5. Apoya a tu vecino</h3>
<p>Detrás de cada restaurante local hay una familia que trabaja duro para sacar adelante un sueño. Cada vez que eliges su menú sobre el de una cadena, estás invirtiendo en la historia de tu comunidad.</p>`
    },
    "3": {
      title: "Guía para registrar tu negocio en FYNDER paso a paso",
      category: "Emprendimiento", color: "#2F5BB7",
      author: "María López", authorInitial: "M", authorGrad: "135deg,#2F5BB7,#67B8B4",
      date: "5 jun 2026", readTime: "3 min",
      image: "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=900&h=450&fit=crop&auto=format",
      body: `<p>Registrar tu negocio en FYNDER es completamente gratuito y toma menos de 2 minutos. Aquí te explicamos cada paso para que tu perfil quede impecable desde el primer día.</p>
<h3>Paso 1: Haz clic en "Registrar negocio"</h3>
<p>Encontrarás este botón en la barra de navegación superior o en la sección principal de la página de inicio. Te llevará directamente al formulario de registro.</p>
<h3>Paso 2: Completa la información básica</h3>
<p>Nombre del negocio, categoría, descripción, dirección, teléfono y horario. Tómate tu tiempo para escribir una buena descripción: es lo primero que verán los clientes potenciales.</p>
<h3>Paso 3: Agrega tus redes sociales</h3>
<p>Si tienes Instagram, Facebook o página web, añádelos. Los usuarios podrán seguirte directamente desde tu perfil en FYNDER.</p>
<h3>Paso 4: Publica</h3>
<p>Haz clic en "Publicar negocio" y listo. Tu negocio aparecerá instantáneamente en el directorio y estará visible para todos los usuarios de tu área.</p>
<h3>Consejos para un perfil exitoso</h3>
<p>✓ Usa una descripción clara y específica de lo que ofreces.</p>
<p>✓ Mantén tus horarios actualizados, especialmente en días festivos.</p>
<p>✓ Responde rápido cuando los clientes te contacten a través de tus redes.</p>`
    },
    "4": {
      title: "Los mejores salones de belleza en tu ciudad: ¿cómo elegir el tuyo?",
      category: "Estilo de vida", color: "#EC4899",
      author: "Laura Soto", authorInitial: "L", authorGrad: "135deg,#EC4899,#8B5CF6",
      date: "1 jun 2026", readTime: "4 min",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=900&h=450&fit=crop&auto=format",
      body: `<p>Encontrar el salón de belleza ideal puede ser una odisea si no sabes qué buscar. Más allá del precio, hay varios factores que determinan si un lugar realmente vale la pena.</p>
<h3>La especialidad importa</h3>
<p>No todos los salones son expertos en todos los servicios. Algunos se especializan en coloración, otros en tratamientos capilares o en uñas. Antes de ir, investiga en qué destacan.</p>
<h3>Lee las reseñas con criterio</h3>
<p>Las opiniones de otros clientes son invaluables. Busca reseñas específicas sobre el servicio que te interesa. Una calificación alta en cortes no garantiza que los tratamientos de keratina sean igualmente buenos.</p>
<h3>La consulta inicial lo dice todo</h3>
<p>Un buen estilista siempre preguntará sobre el historial de tu cabello antes de aplicar cualquier producto. Si no lo hace, es una señal de alerta.</p>
<h3>El ambiente y la limpieza</h3>
<p>Un salón limpio y ordenado refleja la profesionalidad del equipo. Fíjate en los instrumentos de trabajo: deben estar desinfectados y en buen estado.</p>
<h3>Cómo usar FYNDER para encontrarlo</h3>
<p>Filtra por la categoría "Belleza" en nuestro directorio y compara los perfiles. Revisa las fotos, las reseñas de clientes reales y los servicios específicos de cada salón antes de hacer tu cita.</p>`
    },
    "5": {
      title: "Dónde reparar tu smartphone sin salir del barrio",
      category: "Tecnología", color: "#2F5BB7",
      author: "Roberto Díaz", authorInitial: "R", authorGrad: "135deg,#2F5BB7,#1E8F8B",
      date: "28 may 2026", readTime: "3 min",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&h=450&fit=crop&auto=format",
      body: `<p>La pantalla rota de un smartphone es hoy tan común como un grifo que gotea. Y al igual que para el grifo, no hay razón para llamar a alguien de la otra punta de la ciudad cuando hay un especialista a pocas cuadras de tu casa.</p>
<h3>¿Por qué evitar las cadenas de reparación masivas?</h3>
<p>Los centros de reparación de las grandes cadenas suelen tener tiempos de espera largos, precios inflados y a veces usan repuestos genéricos. Los técnicos locales especializados, en cambio, conocen cada modelo al dedillo y trabajan con piezas de calidad.</p>
<h3>Qué buscar en un buen técnico</h3>
<p><strong>Garantía escrita.</strong> Un técnico confiable siempre te da garantía por el trabajo realizado, generalmente entre 30 y 90 días.</p>
<p><strong>Diagnóstico gratuito.</strong> Antes de comprometerte a pagar, tienes derecho a saber exactamente qué le pasa a tu equipo y cuánto costará arreglarlo.</p>
<p><strong>Repuestos originales o certificados.</strong> Pregunta siempre qué tipo de piezas van a usar.</p>
<h3>Usa FYNDER para encontrar técnicos certificados</h3>
<p>En nuestra categoría "Tecnología" encontrarás talleres de reparación verificados cerca de ti. Lee las reseñas de clientes anteriores para elegir con confianza.</p>`
    },
    "6": {
      title: "El impacto real de comprar local: datos que sorprenden",
      category: "Comunidad", color: "#10B981",
      author: "Paola Ruiz", authorInitial: "P", authorGrad: "135deg,#10B981,#67B8B4",
      date: "22 may 2026", readTime: "5 min",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=900&h=450&fit=crop&auto=format",
      body: `<p>Detrás de cada compra local hay una cadena de efectos positivos que van mucho más allá del simple intercambio comercial. Los números son contundentes y deberían cambiar la forma en que todos tomamos decisiones de consumo.</p>
<h3>El efecto multiplicador del dinero local</h3>
<p>Según investigaciones del Institute for Local Self-Reliance, por cada <strong>$100 gastados en un negocio local</strong>, $68 permanecen en la comunidad, frente a $43 de cadenas nacionales y apenas $28 de grandes franquicias internacionales.</p>
<h3>Empleos de calidad</h3>
<p>Los pequeños negocios locales generan el <strong>60-80% de los nuevos empleos</strong> en economías en desarrollo. Son empleos con horarios humanos, cercanía al hogar y trato personalizado que las cadenas rara vez ofrecen.</p>
<h3>Diversidad económica y resiliencia</h3>
<p>Las ciudades con economías dominadas por negocios locales diversificados son más resistentes a las crisis económicas que aquellas dependientes de pocas cadenas grandes. Cuando cierran los gigantes, los locales siguen.</p>
<h3>El impacto medioambiental</h3>
<p>Comprar local generalmente significa cadenas de suministro más cortas, menos embalaje industrial y menor huella de carbono. El pan que compras en la panadería de la esquina recorrió muchísimos menos kilómetros que el de la gran cadena de supermercados.</p>
<h3>¿Qué puedes hacer tú hoy?</h3>
<p>La próxima vez que necesites algo, busca primero en FYNDER si hay un negocio local cerca que lo ofrezca. El cambio empieza con decisiones pequeñas y cotidianas.</p>`
    },
    "7": {
      title: "7 fotos que transformarán el perfil de tu negocio",
      category: "Consejos", color: "#F97316",
      author: "Jorge Castillo", authorInitial: "J", authorGrad: "135deg,#F97316,#F4D35E",
      date: "18 may 2026", readTime: "4 min",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=900&h=450&fit=crop&auto=format",
      body: `<p>Una imagen vale más que mil palabras, especialmente en el mundo digital. Los perfiles con al menos 5 fotos de calidad reciben hasta <strong>3 veces más clics</strong> que los que no tienen imágenes. Y lo mejor: no necesitas un fotógrafo profesional.</p>
<h3>Foto 1: La fachada o entrada</h3>
<p>Que los clientes reconozcan tu negocio cuando lleguen. Una foto clara de la entrada, tomada con buena luz natural, es esencial.</p>
<h3>Foto 2: El ambiente interior</h3>
<p>Muestra cómo se siente estar dentro. Busca la mejor iluminación, ordena el espacio y captura la esencia de tu negocio.</p>
<h3>Foto 3: Tu producto o servicio estrella</h3>
<p>¿Cuál es el plato más pedido? ¿El producto del que más te enorgulleces? Esa foto tiene que brillar.</p>
<h3>Foto 4: El equipo humano</h3>
<p>Las personas detrás de un negocio generan confianza. Una foto del equipo sonriente humaniza tu marca y crea conexión emocional.</p>
<h3>Foto 5: El proceso</h3>
<p>Un pastelero decorando una torta, un mecánico revisando un motor, una estilista trabajando. El proceso en acción genera credibilidad.</p>
<h3>Fotos 6 y 7: Clientes felices y detalles únicos</h3>
<p>Con su permiso, fotografía a clientes satisfechos. Y captura esos pequeños detalles que hacen especial a tu negocio: la pizarra del menú, el detalle en el empaque, la planta en el mostrador.</p>
<h3>Tip final</h3>
<p>Usa siempre luz natural cuando sea posible, limpia el lente del celular antes de fotografiar y toma varias opciones para elegir la mejor. La fotografía móvil actual es más que suficiente para brillar en FYNDER.</p>`
    }
  };

  const art = articles[id];
  if(!art){ showToast("Artículo no encontrado.", "error"); return; }

  // Llenar la página de artículo
  document.getElementById('artHeroImg').src = art.image;
  document.getElementById('artHeroImg').alt = art.title;

  // Hero info
  const heroCat = document.getElementById('artHeroCat');
  if(heroCat){ heroCat.textContent = art.category; }

  const heroTitle = document.getElementById('artTitle');
  if(heroTitle) heroTitle.textContent = art.title;

  const heroAv = document.getElementById('artAuthorAv');
  if(heroAv){
    heroAv.style.background = `linear-gradient(${art.authorGrad})`;
    heroAv.textContent = art.authorInitial;
  }
  const heroAuthorName = document.getElementById('artAuthorName');
  if(heroAuthorName) heroAuthorName.textContent = art.author;

  document.getElementById('artDate').textContent = art.date;
  document.getElementById('artReadTime').textContent = art.readTime;

  // Vieja meta-bar (oculta por CSS, pero la llenamos por si acaso)
  const catLabel = document.getElementById('artCatLabel');
  if(catLabel){ catLabel.textContent = art.category; catLabel.style.color = art.color; }

  document.getElementById('artBody').innerHTML = art.body;

  _currentArticleId = id;
  _seedArticleComments(id);
  renderArticleComments(id);

  goPage('article');
}

/* ── Sistema de comentarios de artículos ── */
let _currentArticleId = null;
const ART_COMMENT_COLORS = [
  'linear-gradient(135deg,#67B8B4,#2F5BB7)',
  'linear-gradient(135deg,#EF4444,#F97316)',
  'linear-gradient(135deg,#10B981,#67B8B4)',
  'linear-gradient(135deg,#8B5CF6,#EC4899)',
  'linear-gradient(135deg,#2F5BB7,#1E8F8B)',
  'linear-gradient(135deg,#F97316,#F4D35E)',
];

function _getArticleComments(articleId) {
  try { return JSON.parse(localStorage.getItem('fynderComments_' + articleId) || '[]'); }
  catch(e){ return []; }
}
function _saveArticleComments(articleId, comments) {
  localStorage.setItem('fynderComments_' + articleId, JSON.stringify(comments));
}

function _getInitials(name) {
  if(!name || !name.trim()) return '?';
  const parts = name.trim().split(/\s+/);
  if(parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

function _getUserAvatarHTML(size = 36) {
  const stored  = localStorage.getItem('fynderAvatarPhoto');
  const preset  = localStorage.getItem('fynderAvatarPreset');
  const initBg  = localStorage.getItem('fynderAvatarInitialBg');
  const user    = JSON.parse(localStorage.getItem('fynderUser') || 'null');
  const name    = user?.name || 'Visitante';
  const initials = _getInitials(name);

  const base = `width:${size}px;height:${size}px;border-radius:50%;flex-shrink:0;overflow:hidden;display:flex;align-items:center;justify-content:center;`;
  if(stored) {
    return `<div style="${base}"><img src="${stored}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;display:block" alt="avatar"></div>`;
  } else if(preset) {
    return `<div style="${base}background:#F0FEFE;font-size:${size*0.55}px;line-height:1">${preset}</div>`;
  } else {
    const bg = initBg || 'linear-gradient(135deg,#67B8B4,#2F5BB7)';
    const fs = initials.length > 1 ? size*0.38 : size*0.45;
    return `<div style="${base}background:${bg};font-weight:700;font-size:${fs}px;color:#fff;font-family:'Poppins',sans-serif;letter-spacing:.5px">${initials}</div>`;
  }
}

function renderArticleComments(articleId) {
  const comments = _getArticleComments(articleId);
  const list = document.getElementById('artCommentList');
  const countEl = document.getElementById('artCommentCount');
  if(countEl) countEl.textContent = comments.length;
  if(!list) return;

  if(comments.length === 0) {
    list.innerHTML = `<div class="article-no-comments"><i class="fas fa-comments"></i>Sé el primero en comentar este artículo.</div>`;
    return;
  }

  const logged = !!localStorage.getItem('fynderLogged');
  const user   = JSON.parse(localStorage.getItem('fynderUser') || 'null');
  const likedKey = 'fynderCommentLikes_' + articleId;
  const liked = JSON.parse(localStorage.getItem(likedKey) || '[]');

  list.innerHTML = comments.slice()
    .sort((a, b) => {
      // Primero por likes DESC, empate por fecha (id timestamp) DESC
      const likeDiff = (b.likes || 0) - (a.likes || 0);
      if (likeDiff !== 0) return likeDiff;
      return parseInt(b.id) - parseInt(a.id);
    })
    .map((c) => {
    const isLiked = liked.includes(c.id);
    const isOwn   = logged && user && c.userId === (user.email || user.name);
    const colorIdx = c.colorIdx !== undefined ? c.colorIdx : 0;
    // Si el comentario guardó avatarPhoto, úsala; si no, usa el color
    let avatarHTML;
    if(c.avatarPhoto) {
      avatarHTML = `<img src="${c.avatarPhoto}" style="width:36px;height:36px;border-radius:50%;object-fit:cover;flex-shrink:0;display:block" alt="avatar">`;
    } else if(c.avatarPreset) {
      avatarHTML = `<div class="article-comment-av" style="background:#F0FEFE;font-size:1.1rem">${c.avatarPreset}</div>`;
    } else {
      const initFs = (c.initial && c.initial.length > 1) ? '.7rem' : '.9rem';
      avatarHTML = `<div class="article-comment-av" style="background:${ART_COMMENT_COLORS[colorIdx]};font-size:${initFs};letter-spacing:.5px">${c.initial}</div>`;
    }
    return `
    <div class="article-comment" id="comment-${c.id}">
      <div class="article-comment-header">
        ${avatarHTML}
        <div class="article-comment-meta">
          <span class="article-comment-name">${c.name}</span>
          <span class="article-comment-date">${c.date}</span>
        </div>
      </div>
      <div class="article-comment-text">${escapeHtml(c.text)}</div>
      <div class="article-comment-actions">
        <button class="article-comment-like-btn ${isLiked ? 'liked' : ''}" onclick="likeComment('${articleId}','${c.id}',this)">
          <i class="fas fa-heart"></i> ${c.likes || 0}
        </button>
        ${isOwn ? `<button class="article-comment-delete-btn" onclick="deleteComment('${articleId}','${c.id}')"><i class="fas fa-trash-alt"></i> Eliminar</button>` : ''}
      </div>
    </div>`;
  }).join('');
}

function toggleArticleComments() {
  const body    = document.getElementById('artCommentsBody');
  const toggle  = document.getElementById('artCommentsToggle');
  if(!body || !toggle) return;
  const isOpen = body.style.display !== 'none';
  body.style.display   = isOpen ? 'none' : 'block';
  toggle.classList.toggle('open', !isOpen);
}

function artCommentCharCount(el) {
  const c = document.getElementById('artCommentChars');
  if(c) c.textContent = el.value.length + ' / 500';
}

function submitArticleComment() {
  const ta = document.getElementById('artCommentText');
  const text = ta ? ta.value.trim() : '';
  if(!text) { showToast('Escribe algo antes de comentar.', 'error'); return; }
  if(text.length < 3) { showToast('El comentario es demasiado corto.', 'error'); return; }

  const logged = !!localStorage.getItem('fynderLogged');
  const user   = JSON.parse(localStorage.getItem('fynderUser') || 'null');
  const name   = logged && user ? user.name : 'Visitante';
  const initial = _getInitials(name);
  const userId  = logged && user ? (user.email || user.name) : null;
  const colorIdx = Math.floor(Math.random() * ART_COMMENT_COLORS.length);

  // Capturar avatar actual del usuario
  const avatarPhoto  = localStorage.getItem('fynderAvatarPhoto') || null;
  const avatarPreset = !avatarPhoto ? (localStorage.getItem('fynderAvatarPreset') || null) : null;
  const avatarInitBg = (!avatarPhoto && !avatarPreset) ? (localStorage.getItem('fynderAvatarInitialBg') || null) : null;

  const now = new Date();
  const dateStr = now.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });

  const comment = {
    id: Date.now().toString(),
    name, initial, userId, colorIdx,
    avatarPhoto, avatarPreset, avatarInitBg,
    text,
    date: dateStr,
    likes: 0,
  };

  const comments = _getArticleComments(_currentArticleId);
  comments.push(comment);
  _saveArticleComments(_currentArticleId, comments);

  ta.value = '';
  artCommentCharCount(ta);
  renderArticleComments(_currentArticleId);
  // Asegurar que el panel de comentarios esté abierto
  const body   = document.getElementById('artCommentsBody');
  const toggle = document.getElementById('artCommentsToggle');
  if(body && body.style.display === 'none') {
    body.style.display = 'block';
    if(toggle) toggle.classList.add('open');
  }
  showToast('¡Comentario publicado! 💬');
}

function likeComment(articleId, commentId, btn) {
  const likedKey = 'fynderCommentLikes_' + articleId;
  const liked = JSON.parse(localStorage.getItem(likedKey) || '[]');
  const comments = _getArticleComments(articleId);
  const idx = comments.findIndex(c => c.id === commentId);
  if(idx === -1) return;

  if(liked.includes(commentId)) {
    // unlike
    comments[idx].likes = Math.max(0, (comments[idx].likes || 0) - 1);
    const newLiked = liked.filter(l => l !== commentId);
    localStorage.setItem(likedKey, JSON.stringify(newLiked));
  } else {
    comments[idx].likes = (comments[idx].likes || 0) + 1;
    liked.push(commentId);
    localStorage.setItem(likedKey, JSON.stringify(liked));
    // Animación del corazón al dar like
    if(btn) {
      btn.classList.add('like-pop');
      setTimeout(() => btn.classList.remove('like-pop'), 350);
    }
  }
  _saveArticleComments(articleId, comments);
  renderArticleComments(articleId);
}

function deleteComment(articleId, commentId) {
  const comments = _getArticleComments(articleId);
  const newComments = comments.filter(c => c.id !== commentId);
  _saveArticleComments(articleId, newComments);
  renderArticleComments(articleId);
  showToast('Comentario eliminado.');
}

function escapeHtml(str) {
  return str
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;')
    .replace(/\n/g,'<br>');
}
