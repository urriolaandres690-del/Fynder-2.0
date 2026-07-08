const CATEGORIES=[{id:"restaurantes",label:"Restaurantes",color:"#EF4444",bg:"#FEF2F2",svg:'<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>'},{id:"salud",label:"Salud",color:"#10B981",bg:"#ECFDF5",svg:'<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>'},{id:"belleza",label:"Belleza",color:"#EC4899",bg:"#FDF2F8",svg:'<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 3 6 6 6-6"/><path d="M20 21H4"/><path d="M4 21V12a9 9 0 0 1 16 0v9"/></svg>'},{id:"transporte",label:"Transporte",color:"#F97316",bg:"#FFF7ED",svg:'<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v7a2 2 0 0 1-2 2z"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>'},{id:"turismo",label:"Turismo",color:"#8B5CF6",bg:"#F5F3FF",svg:'<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21 4 19 2c-2-2-4-2-5.5-.5L10 5 1.8 6.2l3.5 3.5L2 12l4.8 1.2 1.2 4.8 2.2-3.3 3.8 3.8Z"/><path d="m5 15-1 5h5"/></svg>'},{id:"hogar",label:"Hogar",color:"#6B7280",bg:"#F3F4F6",svg:'<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>'},{id:"tecnologia",label:"Tecnología",color:"#2F5BB7",bg:"#EEF2FF",svg:'<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>'},{id:"ropa",label:"Ropa",color:"#67B8B4",bg:"#F0FEFE",svg:'<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" x2="21" y1="6" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>'},{id:"deportes",label:"Deportes",color:"#0EA5E9",bg:"#F0F9FF",svg:'<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M4.93 4.93c4.43 4.43 4.43 10.21 0 14.64"/><path d="M19.07 4.93c-4.43 4.43-4.43 10.21 0 14.64"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>'}]; 

const REVIEWS={
"1":[{name:"Claudia R.",avatar:"C",stars:5,date:"mar 2026",text:"¡Increíble! Pedí la torta de bodas y superó todas mis expectativas. La decoración fue exactamente como la pedí y el sabor…simplemente delicioso. Todos los invitados preguntaron dónde la compramos."},
{name:"Andrés M.",avatar:"A",stars:5,date:"feb 2026",text:"Llevo comprando aquí 3 años. Cada pastel es una obra de arte. El de tres leches es el mejor que he probado en mi vida. Muy recomendado."},
{name:"Patricia V.",avatar:"P",stars:4,date:"ene 2026",text:"Excelente atención y calidad. El único detalle es que a veces el tiempo de espera es largo porque son muy solicitados, pero vale totalmente la pena."}],
"2":[{name:"Sofía L.",avatar:"S",stars:5,date:"abr 2026",text:"El mejor salón que he visitado. Las chicas son muy profesionales y mi coloración quedó perfecta. El ambiente es muy relajante. Ya agendé mi próxima cita."},
{name:"Valeria T.",avatar:"V",stars:4,date:"mar 2026",text:"Buen servicio, los precios son razonables. El manicure me duró casi 3 semanas. Solo bajé una estrella porque el estacionamiento es complicado."},
{name:"Daniela F.",avatar:"D",stars:5,date:"feb 2026",text:"Vine por primera vez y quedé enamorada. El corte que me hicieron es exactamente el que quería. Super recomendado para tratamientos capilares."}],
"3":[{name:"Marco A.",avatar:"M",stars:5,date:"may 2026",text:"Repararon mi laptop en menos de 2 horas y a un precio justo. El técnico explicó exactamente qué tenía el equipo. Ya lo recomendé a toda mi familia."},
{name:"Luis G.",avatar:"L",stars:4,date:"abr 2026",text:"Buen servicio. Mi celular quedó como nuevo después del cambio de pantalla. Tienen los repuestos originales, lo cual es difícil de encontrar en otros lados."},
{name:"Karla P.",avatar:"K",stars:3,date:"mar 2026",text:"El servicio es bueno pero tuve que esperar más de lo prometido. Al final quedé satisfecha con el resultado, solo que la comunicación puede mejorar."}],
"4":[{name:"Roberto N.",avatar:"R",stars:5,date:"jun 2026",text:"Mi café favorito sin duda. El americano es perfecto y los desayunos son abundantes y deliciosos. El lugar es acogedor y el WiFi excelente para trabajar."},
{name:"Isabela C.",avatar:"I",stars:5,date:"may 2026",text:"Vengo casi todos los días. El personal siempre está de buen humor y recuerdan tu pedido habitual. El sandwich de pavo es simplemente adictivo."},
{name:"Camilo R.",avatar:"C",stars:5,date:"may 2026",text:"Ambiente increíble, café de primera calidad y precios muy justos. Es raro encontrar un lugar así en el centro histórico. ¡No lo cambio por nada!"}],
"5":[{name:"María E.",avatar:"M",stars:5,date:"abr 2026",text:"El pan de masa madre es el mejor de la ciudad. Llego temprano porque se acaba rápido. Los brownies son una perdición total. Lugar muy familiar y cálido."},
{name:"Jorge S.",avatar:"J",stars:4,date:"mar 2026",text:"Muy buenos productos artesanales. Las galletas de avena son mis favoritas. A veces se quedan sin stock de ciertos productos, pero eso habla de lo buenos que son."},
{name:"Lucía B.",avatar:"L",stars:5,date:"feb 2026",text:"Descubrí este lugar hace 2 meses y ya no puedo vivir sin su pan. La dueña es encantadora y siempre tiene algo nuevo para probar."}],
"6":[{name:"Dr. Fernando H.",avatar:"F",stars:5,date:"may 2026",text:"Excelente clínica. Llevé a mis hijos al pediatra y el trato fue impecable. Las instalaciones están muy limpias y el personal es muy profesional."},
{name:"Ana P.",avatar:"A",stars:4,date:"abr 2026",text:"Buena atención médica. La nutricionista me dio un plan muy personalizado. Los tiempos de espera son razonables y el precio de la consulta es accesible."},
{name:"Teresa M.",avatar:"T",stars:5,date:"mar 2026",text:"La fisioterapia me ayudó muchísimo con mi lesión de rodilla. El especialista es muy paciente y explica todo con claridad. Totalmente recomendado."}],
"7":[{name:"Gabriela O.",avatar:"G",stars:5,date:"jun 2026",text:"¡Me encanta esta tienda! Siempre encuentro algo bonito y a buen precio. La ropa es de buena calidad y el surtido cambia frecuentemente. Mi lugar favorito para shoppear."},
{name:"Melissa V.",avatar:"M",stars:4,date:"may 2026",text:"Bonita ropa y buenos precios. Compré un vestido precioso para una boda. Solo quisiera que tuvieran más tallas disponibles en algunas prendas."},
{name:"Paola A.",avatar:"P",stars:5,date:"abr 2026",text:"La mejor boutique del área. Las vendedoras te asesoran muy bien y no te presionan para comprar. Volveré pronto a ver las novedades."}],
"8":[{name:"Carmen L.",avatar:"C",stars:5,date:"jun 2026",text:"El cheesecake de frutos rojos es lo mejor que he comido en años. Todo es fresco y natural. Ya hice mi pedido para el cumpleaños de mi mamá."},
{name:"Ricardo V.",avatar:"R",stars:5,date:"may 2026",text:"Los macarons son perfectos, suaves por dentro y crujientes por fuera. Los pedí como regalo y todos quedaron fascinados. Precio justo por la calidad."},
{name:"Natalia G.",avatar:"N",stars:4,date:"abr 2026",text:"Muy buenos postres, ingredientes naturales que se notan en el sabor. La atención es muy amable. El único detalle es que los tiempos de entrega a veces se extienden."}],
"9":[{name:"Carlos M.",avatar:"C",stars:5,date:"jun 2026",text:"El mejor sushi de la ciudad. El salmón es fresco y las porciones son generosas. El ambiente es tranquilo y perfecto para una cena especial."},
{name:"Andrea F.",avatar:"A",stars:5,date:"may 2026",text:"Descubrí este restaurante hace poco y ya es mi favorito. Los rolls de camarón están increíbles. El servicio es rápido y muy amable."},
{name:"Pablo S.",avatar:"P",stars:4,date:"may 2026",text:"Muy buena comida japonesa auténtica. El ramen es espectacular. Precios un poco altos pero la calidad lo justifica completamente."}],
"10":[{name:"Diana R.",avatar:"D",stars:5,date:"may 2026",text:"¡Me encanta este spa! El masaje relajante fue la mejor decisión de la semana. Las terapistas son profesionales y el ambiente es de lujo. Ya tengo mi cita del próximo mes."},
{name:"Fernanda C.",avatar:"F",stars:5,date:"abr 2026",text:"Vine por mi cumpleaños y me trataron increíble. El facial me dejó la piel radiante. Los productos que usan son de primera calidad. 100% recomendado."},
{name:"Stephanie V.",avatar:"S",stars:4,date:"mar 2026",text:"Excelente servicio y ambiente muy relajante. Solo quisiera que tuvieran más opciones de horario porque siempre están llenos. Vale la pena reservar con anticipación."}],
"11":[{name:"Miguel A.",avatar:"M",stars:4,date:"may 2026",text:"Buena ferretería, tienen casi todo lo que uno necesita. Los precios son competitivos y el personal te orienta bien. Encontré piezas que no pude hallar en ningún otro lado."},
{name:"Roberto L.",avatar:"R",stars:5,date:"abr 2026",text:"Llevo años comprando aquí. La atención es excelente y siempre tienen en stock lo que busco. Don Ramón conoce cada producto al dedillo."},
{name:"Héctor M.",avatar:"H",stars:4,date:"mar 2026",text:"Buen lugar, muy surtido. Compré herramientas para la remodelación y quedé satisfecho. A veces la espera en la caja es un poco larga."}],
"12":[{name:"Laura T.",avatar:"L",stars:5,date:"jun 2026",text:"¡Los helados artesanales son una maravilla! El sabor de guayaba es único. Las porciones son generosas y los precios muy accesibles. Perfecto para las tardes calurosas."},
{name:"Alejandro P.",avatar:"A",stars:5,date:"may 2026",text:"El mejor helado de la zona sin duda. Prueben el de maracuyá con chocolate, es una combinación increíble. El local es muy limpio y el servicio rápido."},
{name:"Isabella M.",avatar:"I",stars:5,date:"abr 2026",text:"Vengo todos los fines de semana con mis hijos. Los sabores son originales y creativos. Me alegra apoyar un negocio local tan bueno."}],
"13":[{name:"Ramón V.",avatar:"R",stars:4,date:"may 2026",text:"Buen taller mecánico. Me arreglaron los frenos a buen precio y en el tiempo prometido. El mecánico explica bien qué le pasa al carro."},
{name:"Enrique S.",avatar:"E",stars:5,date:"abr 2026",text:"El mejor taller del barrio. Honesto y eficiente. Llevé mi camioneta con un problema eléctrico que otros talleres no pudieron resolver y aquí lo solventaron."},
{name:"Oscar B.",avatar:"O",stars:3,date:"mar 2026",text:"Servicio aceptable. El trabajo quedó bien pero tardó más de lo esperado. Los precios están bien. Lo recomendaría para servicios sencillos."}],
"14":[{name:"Elena C.",avatar:"E",stars:5,date:"jun 2026",text:"La mejor librería independiente de la ciudad. Siempre encuentro libros que no salen en las librerías grandes. El personal recomienda muy bien. Me encanta el rincón de lectura."},
{name:"Tomás R.",avatar:"T",stars:5,date:"may 2026",text:"Lugar mágico para los amantes de los libros. Tienen una sección de autores latinoamericanos increíble. Los eventos literarios que organizan son fantásticos."},
{name:"Mariana F.",avatar:"M",stars:4,date:"abr 2026",text:"Buena selección de libros y muy buen ambiente. Los precios son razonables. Quisiera que ampliaran el horario los domingos para poder ir más seguido."}],
"15":[{name:"Jaime L.",avatar:"J",stars:5,date:"jun 2026",text:"El mejor tour de la ciudad, guías muy preparados y apasionados. Aprendí más en 3 horas con ellos que en años de vivir aquí. Super recomendado para turistas y locales."},
{name:"Sophie K.",avatar:"S",stars:5,date:"may 2026",text:"Excelente experiencia. El tour del casco histórico fue fascinante. El guía habla español e inglés perfectamente. Sin duda lo mejor que hice en mi visita."},
{name:"Natalia V.",avatar:"N",stars:4,date:"abr 2026",text:"Muy buen tour, bien organizado y con mucha información histórica. Hubiera preferido un poco más de tiempo en algunos lugares pero en general fue excelente."}],
"16":[{name:"Kevin M.",avatar:"K",stars:5,date:"jun 2026",text:"Excelente gimnasio. Los equipos son modernos y están siempre en buen estado. El entrenador de crossfit es increíble, muy motivador. Ya noto los resultados después de 2 meses."},
{name:"Priscila A.",avatar:"P",stars:5,date:"may 2026",text:"Me encanta la clase de yoga por las mañanas. El ambiente es muy tranquilo y el instructor es muy paciente. Las instalaciones siempre limpias y bien iluminadas."},
{name:"Mauricio G.",avatar:"M",stars:4,date:"abr 2026",text:"Buen gym, bien equipado y con buenas clases. El único inconveniente es que a veces las clases de spinning se llenan muy rápido y es difícil conseguir lugar."}],
"17":[{name:"Valeria S.",avatar:"V",stars:5,date:"may 2026",text:"Hicimos la sesión de fotos de compromiso y quedamos absolutamente fascinados. El fotógrafo captó momentos únicos que atesoraremos para siempre. Super profesional."},
{name:"David R.",avatar:"D",stars:5,date:"abr 2026",text:"Usamos el servicio para fotografía de productos de nuestra empresa. Las fotos quedaron increíbles, justo lo que necesitábamos para nuestra tienda en línea. 100% recomendado."},
{name:"Mariela C.",avatar:"M",stars:4,date:"mar 2026",text:"Muy buen trabajo. Las fotos familiares quedaron preciosas. El tiempo de entrega de las fotos editadas fue de 5 días, un poco más de lo prometido pero el resultado valió la espera."}],
"18":[{name:"Abuela Rosa",avatar:"A",stars:5,date:"jun 2026",text:"El sancocho me recordó exactamente al de mi mamá. Los ingredientes son frescos y el sazón es perfecto. Este restaurante mantiene viva la gastronomía panameña tradicional."},
{name:"Ernesto V.",avatar:"E",stars:5,date:"may 2026",text:"El arroz con pollo es el mejor de la ciudad. Porciones generosas y precio muy justo. El ambiente es familiar y acogedor. Ya es mi lugar habitual para el almuerzo."},
{name:"Sandra M.",avatar:"S",stars:5,date:"abr 2026",text:"Los patacones con carne estaban divinos. Todo fresco, todo casero, todo sabroso. Difícil encontrar cocina panameña auténtica así. Lugar imprescindible."}],
"19":[{name:"Rodrigo F.",avatar:"R",stars:4,date:"may 2026",text:"Buen servicio de soporte técnico. Arreglaron la red de mi oficina en una sola visita. Saben lo que hacen y los precios son razonables. Los volveré a contratar."},
{name:"Carolina V.",avatar:"C",stars:5,date:"abr 2026",text:"Instalaron las cámaras de seguridad en mi local de forma profesional y rápida. Explican bien cómo usar el sistema y dan soporte post-venta. Muy recomendados."},
{name:"Arturo P.",avatar:"A",stars:3,date:"mar 2026",text:"El trabajo técnico estuvo bien. Tardaron un poco más de lo estimado pero al final entregaron lo prometido. Buena comunicación durante el proceso."}],
"20":[{name:"Rebeca H.",avatar:"R",stars:5,date:"jun 2026",text:"La mejor boutique de la ciudad sin duda. Encontré el vestido perfecto para mi graduación. La estilista fue increíble ayudándome a elegir. Definitivamente regreso."},
{name:"Fernanda L.",avatar:"F",stars:5,date:"may 2026",text:"Ropa de muy buena calidad y diseños hermosos. El servicio de estilismo personal es un plus que no esperaba y me encantó. Precios altos pero justificados por la calidad."},
{name:"Monica S.",avatar:"M",stars:4,date:"abr 2026",text:"Bonita tienda con ropa exclusiva. Compré un conjunto precioso. Las vendedoras son muy amables y te ayudan a combinar. Quisiera más opciones de tallas."}],
"21":[{name:"Ejecutivo A.",avatar:"E",stars:5,date:"jun 2026",text:"Uso este servicio para todos mis traslados al aeropuerto. Siempre puntuales, los vehículos impecables y los choferes muy profesionales. Sin duda el mejor transporte ejecutivo."},
{name:"María G.",avatar:"M",stars:5,date:"may 2026",text:"Los usé para el traslado de mi boda. Todo perfecto, vehículos decorados según mis instrucciones y el chofer fue extremadamente amable. Superaron todas mis expectativas."},
{name:"Licda. Torres",avatar:"L",stars:4,date:"abr 2026",text:"Servicio confiable para viajes de negocios. Siempre a tiempo, vehículos cómodos. Solo quisiera que la app para reservas fuera un poco más intuitiva."}],
"22":[{name:"Brenda C.",avatar:"B",stars:5,date:"jun 2026",text:"La mejor clínica dental que he visitado. El Dr. fue muy amable y paciente explicando cada procedimiento. La ortodoncia quedó perfecta después de 18 meses. ¡Los recomiendo con los ojos cerrados!"},
{name:"Fernando S.",avatar:"F",stars:5,date:"may 2026",text:"Vine para blanqueamiento dental y el resultado fue espectacular. Mucho mejor que kits caseros. El equipo es muy profesional y las instalaciones de primer nivel."},
{name:"Lorena V.",avatar:"L",stars:4,date:"abr 2026",text:"Excelente atención. Me hicieron un implante dental y el procedimiento fue muy cómodo gracias a la tecnología que usan. Precio alto pero se entiende por la calidad del servicio."}],
"300":[{name:"Jorge L.",avatar:"J",stars:5,date:"jun 2026",text:"Rapidísimos. Necesitaba un documento urgente y llegaron en 30 minutos. El precio es justo y el motorista muy amable. Ya los uso para todos mis envíos."},
{name:"Rosario M.",avatar:"R",stars:4,date:"may 2026",text:"Muy buen servicio de mensajería. Me avisaron en tiempo real el estado del envío. Solo quisiera que cubrieran más zonas fuera del área metropolitana."},
{name:"Iván S.",avatar:"I",stars:5,date:"abr 2026",text:"Los mejores para domicilios de última milla. Siempre puntuales y con buena actitud. Los recomiendo para pequeños negocios que necesitan entregas diarias."}],
"301":[{name:"Lcdo. Rivera",avatar:"L",stars:5,date:"jun 2026",text:"Contratamos el bus para una excursión escolar y fue excelente. El chofer fue muy profesional y el autobús estaba en perfectas condiciones con el aire bien frío."},
{name:"Empresa Logística X",avatar:"E",stars:4,date:"may 2026",text:"Usamos el charter para un evento corporativo. Cumplieron con el horario y la capacidad prometida. Buen trato al cliente. Los volveremos a contratar."},
{name:"Patricia G.",avatar:"P",stars:5,date:"abr 2026",text:"Perfectos para la excursión de la iglesia. El bus grande, limpio y el señor chofer muy paciente con todos. Los precios están muy bien para grupos."}],
"302":[{name:"Turista Alemán",avatar:"T",stars:5,date:"jun 2026",text:"Excelente servicio. Llegaron exactamente a la hora al aeropuerto. El conductor hablaba algo de inglés, lo que me ayudó mucho. Muy recomendado para turistas."},
{name:"Claudia R.",avatar:"C",stars:5,date:"may 2026",text:"Uso Taxi Seguro todas las semanas. Siempre puntuales, los autos limpios y los choferes con uniforme. Me siento segura viajando sola de noche con ellos."},
{name:"Marcos V.",avatar:"M",stars:4,date:"abr 2026",text:"Buen servicio, tarifa al aeropuerto muy razonable. La app para reservar podría ser más rápida pero el servicio en si es de primera calidad."}],
"303":[{name:"Familia Ochoa",avatar:"F",stars:4,date:"jun 2026",text:"Mudanza de casa completa sin ningún daño. Empacaron todo con cuidado y el camión llegó puntual. Tomó más tiempo de lo estimado pero el resultado fue excelente."},
{name:"Empresa ABC",avatar:"E",stars:5,date:"may 2026",text:"Mudamos toda la oficina en un solo día con ellos. Profesionales, organizados y cuidadosos con los equipos. Sin duda los mejores para mudanzas empresariales."},
{name:"Héctor B.",avatar:"H",stars:3,date:"mar 2026",text:"El trabajo quedó bien pero la comunicación previa fue un poco lenta. Al final entregaron en el tiempo acordado y sin daños. Precio competitivo."}],
"304":[{name:"Ejecutiva Martínez",avatar:"E",stars:5,date:"jun 2026",text:"El auto estaba impecable esperándome en el aeropuerto. El proceso de recogida y devolución fue rápido. El precio fue el mejor que encontré. Definitivamente regreso."},
{name:"Familia Rodríguez",avatar:"F",stars:5,date:"may 2026",text:"Alquilamos un SUV para recorrer el interior del país. Sin problemas, bien equipado y el seguro incluido nos dio mucha tranquilidad. 100% recomendado."},
{name:"Tourista Carlos",avatar:"T",stars:4,date:"abr 2026",text:"Buen servicio de alquiler. El carro estaba en buen estado y el precio fue justo. Solo tardaron un poco en el papeleo inicial pero todo salió bien."}],
"305":[{name:"Ingrid H.",avatar:"I",stars:5,date:"jun 2026",text:"El tour al Canal fue lo mejor de mi viaje a Panamá. El guía explicó todo de forma fascinante. Ver las esclusas en acción es impresionante. No se lo pierdan."},
{name:"Familia Peralta",avatar:"F",stars:5,date:"may 2026",text:"Llevamos a los niños y quedaron maravillados. El guía fue muy dinámico y los mantuvo atentos todo el tiempo. El museo interactivo es excelente."},
{name:"Prof. Williams",avatar:"P",stars:5,date:"abr 2026",text:"Perfecto para grupos académicos. El guía bilingüe dominaba perfectamente la historia del Canal. Una experiencia educativa incomparable."}],
"306":[{name:"Andrea V.",avatar:"A",stars:5,date:"jun 2026",text:"Tres días navegando en velero por San Blas. Las aguas más cristalinas que he visto en mi vida. La convivencia con la comunidad Guna fue única e irrepetible."},
{name:"Mochilero Europeo",avatar:"M",stars:5,date:"may 2026",text:"Best experience in Panama! The Guna people were amazing, the water was unreal. The team was very professional and the boat was comfortable. Worth every penny."},
{name:"Pareja Luna de Miel",avatar:"P",stars:4,date:"abr 2026",text:"Increíble luna de miel en San Blas. Las islas son un paraíso. Solo deberían mejorar la comunicación previa al viaje, pero la experiencia en sí fue perfecta."}],
"307":[{name:"Birdwatcher Carlos",avatar:"B",stars:5,date:"jun 2026",text:"Avistamos más de 60 especies en un solo día en Soberanía. El guía naturalista conoce cada rincón del parque. Una joya para los amantes de la naturaleza."},
{name:"Fernanda P.",avatar:"F",stars:5,date:"may 2026",text:"El kayak en el Lago Gatún fue mágico. Ver el Canal desde el agua rodeada de selva es una experiencia que no olvidaré. Los guías son muy seguros y preparados."},
{name:"Grupo Scout",avatar:"G",stars:4,date:"abr 2026",text:"Excelente experiencia para nuestro grupo de jóvenes. El sendero del Camino de Cruces es histórico y hermoso. Muy recomendado para educación ambiental."}],
"308":[{name:"Turista Española",avatar:"T",stars:5,date:"jun 2026",text:"El mejor tour a pie que he hecho en Latinoamérica. El guía era un apasionado del Casco Viejo, cada esquina tiene una historia increíble. Grupo pequeño, perfecto."},
{name:"Estudiante Historia",avatar:"E",stars:5,date:"may 2026",text:"Como estudiante de historia, este tour fue extraordinario. La profundidad histórica y arquitectónica que maneja el guía es impresionante. Totalmente recomendado."},
{name:"Pareja Canadiense",avatar:"P",stars:5,date:"abr 2026",text:"We loved every minute of this walking tour. The guide was passionate and knowledgeable. The Casco Viejo is beautiful and this tour helped us truly appreciate it."}],
"309":[{name:"Aventurero Sebastián",avatar:"A",stars:5,date:"jun 2026",text:"Ver el amanecer desde la cima del Barú con vista a los dos océanos fue un momento que me cambió la vida. El guía fue fundamental para llegar seguros a la cima."},
{name:"Atleta Patricia",avatar:"A",stars:5,date:"may 2026",text:"Reto físico pero absolutamente vale la pena. El equipo que proveen es de buena calidad y el guía motiva en los momentos difíciles. Una experiencia de vida."},
{name:"Turista Mexicano",avatar:"T",stars:4,date:"abr 2026",text:"Magnífica experiencia. El frío en la cima sorprende pero el paisaje lo recompensa. Ir bien preparado con ropa abrigada. El guía fue excelente."}],
"310":[{name:"Novia Feliz",avatar:"N",stars:5,date:"jun 2026",text:"Mi vestido de novia quedó exactamente como lo soñé. La costurera tiene un talento increíble y mucha paciencia con los cambios. Todas las invitadas preguntaron dónde lo hice."},
{name:"Ejecutiva Rosa",avatar:"E",stars:5,date:"may 2026",text:"Me confeccionaron un traje sastre a medida que quedó perfecto. El ajuste es impecable y la tela de excelente calidad. Precio muy justo por el trabajo."},
{name:"Susana M.",avatar:"S",stars:4,date:"abr 2026",text:"Arreglaron varios vestidos y quedaron como nuevos. Muy buena mano con las costuras y arreglos de precisión. Solo el tiempo de entrega fue un poco largo."}],
"311":[{name:"Futbolista Amateur",avatar:"F",stars:5,date:"jun 2026",text:"Encontré todo el equipo de fútbol que necesitaba a buen precio. El personal me asesoró muy bien para elegir los tacos correctos según el terreno. Excelente servicio."},
{name:"Runner María",avatar:"R",stars:5,date:"may 2026",text:"Las zapatillas de running que compré son perfectas. Me midieron la pisada antes de recomendar el modelo. Eso marca la diferencia frente a otras tiendas."},
{name:"Padre de Familia",avatar:"P",stars:4,date:"abr 2026",text:"Buena tienda deportiva con variedad de marcas. Los precios son competitivos. Compré equipamiento de natación para mis hijos y quedé muy satisfecho."}],
"312":[{name:"Mamá Orgullosa",avatar:"M",stars:5,date:"jun 2026",text:"Compré la pollera de mi hija para el desfile aquí. La calidad es extraordinaria y los tembleques son preciosos. Esta tienda es un tesoro cultural de Panamá."},
{name:"Turista Admirada",avatar:"T",stars:5,date:"may 2026",text:"Vine a comprar un recuerdo de Panamá y me llevé una montuna preciosa. La señora de la tienda me explicó la historia de cada prenda. Lugar único y especial."},
{name:"Profesora de Folclore",avatar:"P",stars:5,date:"abr 2026",text:"La mejor tienda de trajes típicos del país. Auténticos, bien elaborados y a precios justos. Recomiendo esta tienda a todos mis estudiantes de danza folclórica."}],
"313":[{name:"Mamá Beatriz",avatar:"M",stars:5,date:"jun 2026",text:"Encontré todo para mis tres hijos en un solo lugar. Ropa bonita, buen precio y muchas tallas. Los uniformes escolares son de excelente calidad y duran todo el año."},
{name:"Abuela Feliz",avatar:"A",stars:4,date:"may 2026",text:"Muy buena tienda para niños. Compré conjuntos de fiesta para mis nietos y quedaron adorables. Buena atención aunque en días de quincena hay mucha gente."},
{name:"Papá Moderno",avatar:"P",stars:5,date:"abr 2026",text:"Perfecto para comprar ropa de marca para los niños sin gastar una fortuna. Los precios son muy razonables y la calidad muy buena. Regreso cada temporada."}],
"314":[{name:"Fashionista Indie",avatar:"F",stars:5,date:"jun 2026",text:"¡Lugar increíble! Encontré una chaqueta de los 80s que está en perfectas condiciones. Precio súper accesible y la selección es muy bien curada. Mi tienda favorita."},
{name:"Estudiante Arte",avatar:"E",stars:5,date:"may 2026",text:"Para los amantes de la moda alternativa este lugar es un paraíso. Todo está bien organizado por décadas y los precios son imbatibles. Sostenibilidad en su máxima expresión."},
{name:"Bloguera Moda",avatar:"B",stars:4,date:"abr 2026",text:"Buenísima selección de prendas vintage. Encontré piezas únicas para mis publicaciones. Solo falta un poco más de variedad en calzado retro."}],
"315":[{name:"Joven Programador",avatar:"J",stars:5,date:"jun 2026",text:"Tomé el curso de Python desde cero y en 3 meses estoy haciendo proyectos reales. Los instructores son muy pacientes y el material está muy bien estructurado."},
{name:"Mamá de Niño Curioso",avatar:"M",stars:5,date:"may 2026",text:"Mi hijo de 10 años ama el curso de robótica. Llega a casa emocionado cada semana. Los instructores saben cómo enseñar a niños de manera divertida y efectiva."},
{name:"Profesional Reconvertido",avatar:"P",stars:4,date:"abr 2026",text:"Tomé el bootcamp de desarrollo web para cambiar de carrera. La metodología es muy práctica. Me consiguieron una pasantía al terminar. Vale totalmente la inversión."}],
"316":[{name:"Ingeniero Luis",avatar:"I",stars:5,date:"jun 2026",text:"Mandé a hacer un prototipo para mi proyecto de tesis y quedó perfecto. La precisión de la impresión fue increíble. Entregaron antes de lo prometido."},
{name:"Diseñadora Industrial",avatar:"D",stars:5,date:"may 2026",text:"Excelente servicio para prototipos de producto. La calidad en resina es muy alta y los tiempos son razonables. Ya sé dónde venir para todos mis proyectos."},
{name:"Coleccionista Figuras",avatar:"C",stars:4,date:"abr 2026",text:"Hice una figura personalizada de mi mascota y quedó adorable. El nivel de detalle es muy bueno. Para pedidos pequeños el precio unitario es un poco alto."}],
"317":[{name:"Propietario Smart",avatar:"P",stars:5,date:"jun 2026",text:"Automatizaron toda mi casa en un fin de semana. La integración con Google Home es perfecta. Ahora controlo todo desde el celular. El equipo fue muy profesional."},
{name:"Empresa Condominios",avatar:"E",stars:5,date:"may 2026",text:"Instalaron el sistema de control de acceso en 40 unidades. Trabajo impecable, sin interrupciones y en tiempo récord. Los propietarios están muy satisfechos."},
{name:"Tech Entusiasta",avatar:"T",stars:4,date:"abr 2026",text:"Muy buen servicio de instalación. Los técnicos conocen bien los productos y la programación fue precisa. Solo quisiera más opciones de marcas de gama media."}],
"318":[{name:"Gamer Profesional",avatar:"G",stars:5,date:"jun 2026",text:"Me armaron la PC de mis sueños dentro de mi presupuesto. Los componentes son de primera y la optimización que hicieron fue excelente. Rinde más de lo esperado."},
{name:"Diseñadora Gráfica",avatar:"D",stars:5,date:"may 2026",text:"Mi PC para diseño renderiza proyectos en la mitad del tiempo que antes. Saben exactamente qué componentes elegir para cada uso. Garantía cumplida al pie de la letra."},
{name:"Estudiante Ingeniería",avatar:"E",stars:4,date:"abr 2026",text:"Buena asesoría para armar una PC de trabajo con presupuesto limitado. El resultado superó mis expectativas. La garantía en mano de obra me dio mucha confianza."}],
"319":[{name:"Gerente TI",avatar:"G",stars:5,date:"jun 2026",text:"La auditoría de seguridad que realizaron fue muy exhaustiva. Encontraron vulnerabilidades que nuestro equipo interno no había detectado. Servicio de primer nivel."},
{name:"Dueño PYME",avatar:"D",stars:5,date:"may 2026",text:"Gracias a su capacitación, nuestros empleados ahora identifican intentos de phishing. Inversión pequeña que puede evitar pérdidas enormes. Muy recomendados."},
{name:"CTO Startup",avatar:"C",stars:4,date:"abr 2026",text:"Excelente consultoría. Los informes técnicos son muy claros y accionables. El precio es alto pero acorde al nivel de especialización. Certificación ISO 27001 lograda."}],
"320":[{name:"Nuevo Propietario",avatar:"N",stars:5,date:"jun 2026",text:"Amoblaron mi apartamento nuevo de principio a fin. El asesor de interiores tuvo un gusto increíble y respetó mi presupuesto. El resultado es de revista."},
{name:"Pareja Recién Casada",avatar:"P",stars:5,date:"may 2026",text:"Compramos toda la sala y el comedor aquí. Calidad excepcional y el diseño es moderno y funcional. La entrega e instalación fue puntual y profesional."},
{name:"Decoradora Independiente",avatar:"D",stars:4,date:"abr 2026",text:"Buena selección de muebles y accesorios. Los muebles a medida que pedí tardaron un poco más de lo prometido pero el resultado final fue perfecto para el espacio."}],
"321":[{name:"Jardinerita Apasionada",avatar:"J",stars:5,date:"jun 2026",text:"Compraron y plantaron todo mi jardín en dos días. Quedó increíble, con plantas tropicales hermosas. El mantenimiento mensual mantiene todo perfecto todo el año."},
{name:"Condominio Las Palmas",avatar:"C",stars:5,date:"may 2026",text:"Diseñaron las áreas verdes de nuestro condominio y el resultado fue espectacular. Los residentes están encantados. El equipo es muy profesional y creativo."},
{name:"Ama de Casa",avatar:"A",stars:4,date:"abr 2026",text:"Compré varias plantas tropicales y todas están creciendo muy bien. El personal me enseñó cómo cuidarlas correctamente. Buen vivero con precios accesibles."}],
"322":[{name:"Recién Casados",avatar:"R",stars:5,date:"jun 2026",text:"Equipamos toda nuestra cocina aquí. La lavadora y la refrigeradora son excelentes. El financiamiento a 24 meses sin intereses fue clave para nuestra decisión."},
{name:"Propietario Apartamento",avatar:"P",stars:4,date:"may 2026",text:"Buena tienda de electrodomésticos. Variedad de marcas y modelos. El técnico que vino a instalar la lavadora fue muy profesional. Entrega el mismo día de la compra."},
{name:"Ama de Casa Organizada",avatar:"A",stars:5,date:"abr 2026",text:"La licuadora y el microondas que compré son de excelente calidad. El precio fue el mejor que encontré en la ciudad. El servicio posventa funcionó perfecto cuando tuve una duda."}],
"323":[{name:"Remodelador Óscar",avatar:"R",stars:4,date:"jun 2026",text:"Buena variedad de pinturas y colores. El personal me ayudó a elegir el acabado correcto para cada ambiente. El servicio de pintura a domicilio quedó excelente."},
{name:"Decoradora Carmen",avatar:"D",stars:5,date:"may 2026",text:"Las mezclas personalizadas de color son increíbles. Llevé una foto y lograron el tono exacto que buscaba. Servicio muy profesional y sin manchas en los pisos."},
{name:"Propietario Local",avatar:"P",stars:3,date:"abr 2026",text:"El trabajo de pintura del local quedó bien pero tardó más de lo acordado. La calidad de la pintura es buena y el precio fue razonable. Comunicación mejorable."}],
"324":[{name:"Familia Segura",avatar:"F",stars:5,date:"jun 2026",text:"Instalaron el sistema de alarma y cámaras en mi casa y me siento mucho más tranquila. La respuesta ante una prueba de emergencia fue inmediata. Excelente servicio."},
{name:"Administrador Edificio",avatar:"A",stars:5,date:"may 2026",text:"Instalaron el control de acceso en todo el edificio. Los residentes están muy conformes. El monitoreo 24/7 ya detectó un incidente y respondieron en minutos."},
{name:"Empresario Prudente",avatar:"E",stars:4,date:"abr 2026",text:"Buen sistema de seguridad para mi local. La instalación fue rápida y sin daños en las paredes. El precio mensual del monitoreo es razonable por la tranquilidad que da."}]
};

const BUSINESSES=[
/* ── RESTAURANTES (38) ── */
{id:"1",name:"Pastelería Luna",category:"Restaurantes",categoryId:"restaurantes",description:"Pasteles artesanales elaborados con ingredientes frescos y locales. Especialidad en tortas personalizadas para bodas, cumpleaños y eventos especiales. Cada pieza es una obra de arte comestible.",address:"Calle Principal 45, Centro",hours:"Lun–Sáb 8:00am – 8:00pm",rating:4.9,reviews:312,image:"https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=80&h=80&fit=crop&auto=format",phone:"+507 6234-5678",instagram:"@pasteleria_luna",facebook:"PasteleriaLuna",tags:["Pasteles","Tortas","Repostería","Personalizado"],isNew:false,isFeatured:true,isPopular:true,deal:{label:"20% OFF",desc:"En tortas personalizadas",color:"#EF4444"},mapQuery:"Calle+Principal+45+Centro"},{id:"2",name:"Salón Belleza Mía",category:"Belleza",categoryId:"belleza",description:"Tu espacio de transformación personal. Ofrecemos cortes, coloración, tratamientos capilares, manicure y pedicure con los mejores productos del mercado.",address:"Av. Las Flores 120, Zona Rosa",hours:"Mar–Dom 9:00am – 7:00pm",rating:4.7,reviews:198,image:"https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=80&h=80&fit=crop&auto=format",phone:"+507 6345-6789",instagram:"@belleza_mia_salon",tags:["Cortes","Coloración","Manicure","Spa"],isNew:true,isFeatured:true,deal:{label:"2×1",desc:"Manicure + pedicure",color:"#EC4899"},mapQuery:"Avenida+Las+Flores+120+Zona+Rosa"},
{id:"3",name:"TechPoint",category:"Tecnología",categoryId:"tecnologia",description:"Venta y reparación de dispositivos electrónicos. Smartphones, laptops, tablets y accesorios. Servicio técnico certificado con garantía extendida.",address:"Centro Comercial Plaza, Local 32",hours:"Lun–Sáb 9:00am – 6:00pm",rating:4.5,reviews:87,image:"https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1565211604822-2641d0b081a6?w=80&h=80&fit=crop&auto=format",phone:"+507 6456-7890",website:"techpoint.local",facebook:"TechPointStore",tags:["Reparación","Smartphones","Laptops","Accesorios"],isPopular:true,mapQuery:"Centro+Comercial+Plaza+Panama"},
{id:"5",name:"Dulce Hogar",category:"Restaurantes",categoryId:"restaurantes",description:"Panadería y repostería artesanal con recetas tradicionales de abuela. Pan fresco cada mañana, galletas, brownies y postres caseros que enamoran.",address:"Barrio El Jardín, Calle 3 #12",hours:"Lun–Sáb 7:00am – 6:00pm",rating:4.6,reviews:156,image:"https://images.unsplash.com/photo-1568254183919-78a4f43a2877?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1509440159596-0249088772ff?w=80&h=80&fit=crop&auto=format",phone:"+507 6678-9012",facebook:"DulceHogarBakery",tags:["Pan","Galletas","Postres","Artesanal"],isNew:true,mapQuery:"Barrio+El+Jardin+Calle+3"},
{id:"6",name:"Clínica Salud Total",category:"Salud",categoryId:"salud",description:"Atención médica integral con especialistas en medicina general, pediatría, nutrición y fisioterapia. Consultas presenciales y telemedicina disponible.",address:"Av. Salud 200, Col. Médica",hours:"Lun–Vie 8:00am – 5:00pm",rating:4.4,reviews:73,image:"https://images.unsplash.com/photo-1578474846511-04ba529f0b88?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1559757175-5700dde675bc?w=80&h=80&fit=crop&auto=format",phone:"+507 6789-0123",website:"saludtotal.med",tags:["Médicos","Pediatría","Nutrición","Telemedicina"],isFeatured:true,mapQuery:"Avenida+Salud+200+Panama"},
{id:"7",name:"ModaUrbana",category:"Ropa",categoryId:"ropa",description:"Boutique de moda contemporánea con las últimas tendencias para hombre y mujer. Diseños exclusivos, marcas locales y ropa importada a precios accesibles.",address:"Paseo Comercial, Local 45-B",hours:"Lun–Sáb 10:00am – 8:00pm",rating:4.3,reviews:64,image:"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=80&h=80&fit=crop&auto=format",phone:"+507 6890-1234",instagram:"@modaurbana_oficial",tags:["Moda","Ropa","Boutique","Tendencias"],isNew:true,isPopular:true,mapQuery:"Paseo+Comercial+Panama"},
{id:"8",name:"Repostería María",category:"Restaurantes",categoryId:"restaurantes",description:"Postres y pasteles personalizados para toda ocasión. Especialidad en cheesecakes, macarons y tartas de temporada con ingredientes 100% naturales.",address:"Col. Las Palmas, Blvd. Norte 67",hours:"Mar–Dom 10:00am – 7:00pm",rating:4.8,reviews:241,image:"https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1486887396153-fa416526c108?w=80&h=80&fit=crop&auto=format",phone:"+507 6901-2345",instagram:"@reposteria_maria",facebook:"ReposteriaMaria",tags:["Pasteles","Cheesecake","Macarons","Natural"],isFeatured:true,isPopular:true,mapQuery:"Blvd+Norte+67+Panama"},
{id:"9",name:"Sushi Nikkei",category:"Restaurantes",categoryId:"restaurantes",description:"Auténtica fusión nikkei con ingredientes frescos del mercado. Rolls creativos, sashimi premium y ramen artesanal en un ambiente íntimo y moderno.",address:"Calle 50, Miraflores, Local 8",hours:"Mar–Dom 12:00pm – 10:00pm",rating:4.7,reviews:189,image:"https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=80&h=80&fit=crop&auto=format",phone:"+507 6312-4567",instagram:"@sushi_nikkei_ptv",tags:["Sushi","Ramen","Japonés","Fusión"],isFeatured:true,isNew:false,mapQuery:"Calle+50+Miraflores+Panama"},
{id:"10",name:"Spa Serenidad",category:"Salud",categoryId:"salud",description:"Centro de bienestar integral con masajes relajantes, faciales, tratamientos corporales y aromaterapia. Un oasis de paz en el corazón de la ciudad.",address:"Vía Argentina 33, El Cangrejo",hours:"Lun–Sáb 9:00am – 8:00pm",rating:4.9,reviews:276,image:"https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1544991060-b42da24bef4b?w=80&h=80&fit=crop&auto=format",phone:"+507 6423-8901",instagram:"@spa_serenidad",website:"spaserenidad.com",tags:["Masajes","Faciales","Bienestar","Aromaterapia"],isFeatured:true,isPopular:true,deal:{label:"15% OFF",desc:"Primer masaje relajante",color:"#10B981"},mapQuery:"Via+Argentina+33+El+Cangrejo+Panama"},
{id:"11",name:"Ferretería El Maestro",category:"Hogar",categoryId:"hogar",description:"Todo para tu hogar y construcción. Herramientas eléctricas y manuales, materiales de construcción, plomería y electricidad. Asesoramiento personalizado.",address:"Av. Balboa 78, Bella Vista",hours:"Lun–Sáb 7:00am – 7:00pm",rating:4.3,reviews:94,image:"https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=80&h=80&fit=crop&auto=format",phone:"+507 6534-2109",facebook:"FerreteriaElMaestro",tags:["Herramientas","Construcción","Plomería","Electricidad"],mapQuery:"Avenida+Balboa+78+Bella+Vista+Panama"},
{id:"12",name:"Heladería Tropical",category:"Restaurantes",categoryId:"restaurantes",description:"Helados artesanales con frutas tropicales de temporada. Más de 30 sabores únicos como maracuyá, guanábana, tamarindo y carambola. Sin colorantes artificiales.",address:"Calle Uruguay 15, San Felipe",hours:"Todos los días 11:00am – 10:00pm",rating:4.8,reviews:332,image:"https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1551248429-40975aa4de74?w=80&h=80&fit=crop&auto=format",phone:"+507 6645-3210",instagram:"@heladeria_tropical",facebook:"HeleaderiaLaTropical",tags:["Helados","Artesanal","Tropical","Natural"],isNew:true,isPopular:true,mapQuery:"Calle+Uruguay+15+San+Felipe+Panama"},
{id:"13",name:"Taller Auto Express",category:"Transporte",categoryId:"transporte",description:"Taller mecánico de confianza para todo tipo de vehículos. Diagnóstico computarizado, frenos, suspensión, cambio de aceite y mantenimiento general.",address:"Tumba Muerto, Calle F #23",hours:"Lun–Sáb 7:30am – 5:30pm",rating:4.2,reviews:118,image:"https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1542826391-ee6a9f1f93c4?w=80&h=80&fit=crop&auto=format",phone:"+507 6756-4321",facebook:"AutoExpressTaller",tags:["Mecánica","Frenos","Diagnóstico","Mantenimiento"],mapQuery:"Tumba+Muerto+Panama"},
{id:"14",name:"Librería Imaginarium",category:"Hogar",categoryId:"hogar",description:"Librería independiente especializada en literatura latinoamericana, ciencia ficción y cómics. Eventos literarios mensuales y club de lectura activo.",address:"Av. Federico Boyd 44, Paitilla",hours:"Mar–Dom 10:00am – 8:00pm",rating:4.7,reviews:143,image:"https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=80&h=80&fit=crop&auto=format",phone:"+507 6867-5432",instagram:"@imaginarium_libros",website:"librosimagines.com",tags:["Libros","Literatura","Cómics","Eventos"],isNew:true,mapQuery:"Avenida+Federico+Boyd+44+Paitilla+Panama"},
{id:"15",name:"City Tours Panamá",category:"Turismo",categoryId:"turismo",description:"Recorridos guiados por el casco histórico, el Canal y los barrios más emblemáticos. Tours en español e inglés. Grupos pequeños para una experiencia personalizada.",address:"Plaza de Francia, Casco Viejo",hours:"Todos los días 8:00am – 6:00pm",rating:4.8,reviews:267,image:"https://images.unsplash.com/photo-1548707309-dcebeab9ea9b?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=80&h=80&fit=crop&auto=format",phone:"+507 6978-6543",instagram:"@citytours_pty",website:"citytourspty.com",tags:["Tours","Historia","Canal","Casco Viejo"],isFeatured:true,isPopular:true,deal:{label:"30% OFF",desc:"Tours de fin de semana",color:"#8B5CF6"},mapQuery:"Plaza+de+Francia+Casco+Viejo+Panama"},
{id:"16",name:"GymFit Centro",category:"Salud",categoryId:"salud",description:"Gimnasio moderno con equipos de última generación. Clases de spinning, yoga, zumba y crossfit. Entrenadores certificados y planes nutricionales personalizados.",address:"Calle 42, Bella Vista, Edificio Sport",hours:"Lun–Vie 5:00am – 10:00pm, Sáb–Dom 7:00am – 8:00pm",rating:4.5,reviews:201,image:"https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=80&h=80&fit=crop&auto=format",phone:"+507 6089-7654",instagram:"@gymfit_centro",facebook:"GymFitCentro",tags:["Gym","Crossfit","Yoga","Nutrición"],isNew:true,isPopular:true,deal:{label:"Mes gratis",desc:"Con inscripción anual",color:"#0EA5E9"},mapQuery:"Calle+42+Bella+Vista+Panama"},
{id:"17",name:"Estudio Foto&Arte",category:"Turismo",categoryId:"turismo",description:"Estudio profesional de fotografía para retratos, eventos empresariales, sesiones familiares y productos. Edición profesional incluida en todos los paquetes.",address:"Calle Manuel Espinosa 12, San Francisco",hours:"Lun–Sáb 9:00am – 6:00pm",rating:4.6,reviews:88,image:"https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1452802447250-470a88ac82bc?w=80&h=80&fit=crop&auto=format",phone:"+507 6190-8765",instagram:"@fotoarte_pty",website:"fotoartestudio.com",tags:["Fotografía","Retratos","Eventos","Edición"],mapQuery:"Calle+Manuel+Espinosa+12+San+Francisco+Panama"},
{id:"18",name:"Cocina de la Abuela",category:"Restaurantes",categoryId:"restaurantes",description:"Restaurante familiar con recetas auténticas panameñas. Sancocho de gallina, arroz con pollo, patacones y postres caseros como el tembleque y la bienmesabe.",address:"Calle 10, El Chorrillo, Local 5",hours:"Lun–Dom 11:00am – 9:00pm",rating:4.7,reviews:348,image:"https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=80&h=80&fit=crop&auto=format",phone:"+507 6201-9876",facebook:"CocinaAbuelapty",tags:["Panameño","Sancocho","Familiar","Casero"],isPopular:true,mapQuery:"Calle+10+El+Chorrillo+Panama"},
{id:"19",name:"Computec Soluciones",category:"Tecnología",categoryId:"tecnologia",description:"Servicio técnico especializado en computadoras, redes empresariales e instalación de cámaras de seguridad. Atención a domicilio disponible en toda la ciudad.",address:"Av. Ricardo J. Alfaro, Torres del Sol, Of. 3B",hours:"Lun–Vie 8:00am – 6:00pm, Sáb 9:00am – 2:00pm",rating:4.4,reviews:76,image:"https://images.unsplash.com/photo-1588702547919-26089e690ecc?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=80&h=80&fit=crop&auto=format",phone:"+507 6312-0987",instagram:"@computec_pty",facebook:"ComputecSoluciones",tags:["Computadoras","Redes","Cámaras","Domicilio"],isNew:true,mapQuery:"Avenida+Ricardo+Alfaro+Panama"},
{id:"20",name:"Boutique Xclusive",category:"Ropa",categoryId:"ropa",description:"Ropa de diseñador local y marcas internacionales seleccionadas. Prendas exclusivas para mujer con servicio de estilismo personal incluido en cada compra.",address:"Mall Via Veneto, Local 112, El Dorado",hours:"Lun–Dom 10:00am – 9:00pm",rating:4.5,reviews:112,image:"https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=80&h=80&fit=crop&auto=format",phone:"+507 6423-1098",instagram:"@boutique_xclusive",tags:["Diseñador","Exclusivo","Mujer","Estilismo"],isPopular:true,mapQuery:"Mall+Via+Veneto+El+Dorado+Panama"},
{id:"21",name:"Transporte Ejecutivo GTR",category:"Transporte",categoryId:"transporte",description:"Servicio de transporte privado premium para ejecutivos, aeropuerto y eventos. Flota de vehículos modernos, choferes certificados y puntualidad garantizada.",address:"Punta Pacífica, Torre Global, Piso 1",hours:"Todos los días 24 horas",rating:4.6,reviews:159,image:"https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=80&h=80&fit=crop&auto=format",phone:"+507 6534-2109",instagram:"@gtr_panama",website:"gtrtransporte.com",tags:["Ejecutivo","Aeropuerto","Premium","24 horas"],isFeatured:true,mapQuery:"Punta+Pacifica+Panama"},
{id:"22",name:"Clínica Dental Sonrisas",category:"Salud",categoryId:"salud",description:"Odontología estética y general. Ortodoncia, blanqueamiento, implantes y limpiezas profesionales. Tecnología digital para diagnósticos precisos sin radiación innecesaria.",address:"Calle 50, San Francisco, Edificio Médico, Piso 3",hours:"Lun–Vie 8:00am – 6:00pm, Sáb 9:00am – 1:00pm",rating:4.8,reviews:183,image:"https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1559757175-5700dde675bc?w=80&h=80&fit=crop&auto=format",phone:"+507 6645-3210",instagram:"@clinica_sonrisas",website:"clinicasonrisas.com",tags:["Dental","Ortodoncia","Estética","Implantes"],isNew:true,isFeatured:true,mapQuery:"Calle+50+San+Francisco+Panama"},
/* ── RESTAURANTES adicionales (ids 23–53) ── */
{id:"23",name:"Tacos & Burritos",category:"Restaurantes",categoryId:"restaurantes",description:"Auténtica comida mexicana callejera con ingredientes frescos. Tacos de carne asada, al pastor, burritos y quesadillas con salsas caseras de distintos niveles de picante.",address:"Calle 48, El Cangrejo, Local 7",hours:"Mar–Dom 11:00am – 10:00pm",rating:4.5,reviews:203,image:"https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=80&h=80&fit=crop&auto=format",phone:"+507 6711-2233",instagram:"@tacos_burritos_pty",tags:["Mexicano","Tacos","Burritos","Picante"],isPopular:true,mapQuery:"Calle+48+El+Cangrejo+Panama"},
{id:"24",name:"Pizzería Napoli",category:"Restaurantes",categoryId:"restaurantes",description:"Pizza artesanal al horno de leña con masa madre fermentada 48 horas. Ingredientes importados de Italia y tomates San Marzano. Ambiente familiar y acogedor.",address:"Av. Balboa 112, Bella Vista",hours:"Lun–Dom 12:00pm – 11:00pm",rating:4.7,reviews:289,image:"https://images.unsplash.com/photo-1513104890138-7c749659a591?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=80&h=80&fit=crop&auto=format",phone:"+507 6722-3344",instagram:"@napoli_pty",facebook:"PizzeriaNapoliPanama",tags:["Pizza","Italiana","Horno de Leña","Artesanal"],isFeatured:true,isPopular:true,deal:{label:"Pizza gratis",desc:"Comprando 2 pizzas grandes",color:"#F97316"},mapQuery:"Avenida+Balboa+112+Bella+Vista+Panama"},
{id:"25",name:"Burger House",category:"Restaurantes",categoryId:"restaurantes",description:"Hamburguesas gourmet con carne de res 100% nacional. Panes artesanales, quesos importados y salsas secretas. Papas fritas con especias y batidos artesanales.",address:"Calle Uruguay 88, San Felipe",hours:"Lun–Dom 11:00am – 11:00pm",rating:4.6,reviews:341,image:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1550547660-d9450f859349?w=80&h=80&fit=crop&auto=format",phone:"+507 6733-4455",instagram:"@burgerhouse_pty",tags:["Hamburguesas","Gourmet","Batidos","Papas"],isPopular:true,mapQuery:"Calle+Uruguay+88+San+Felipe+Panama"},
{id:"26",name:"Mariscos El Puerto",category:"Restaurantes",categoryId:"restaurantes",description:"Mariscos frescos del día directamente del Pacífico. Ceviche, corvina al ajillo, camarones en salsa y langosta. Vista al mar y ambiente tropical inigualable.",address:"Calzada de Amador, Local 4",hours:"Mar–Dom 12:00pm – 10:00pm",rating:4.8,reviews:267,image:"https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1563612116625-3012372fccce?w=80&h=80&fit=crop&auto=format",phone:"+507 6744-5566",instagram:"@mariscos_elpuerto",facebook:"MariscosElPuerto",tags:["Mariscos","Ceviche","Corvina","Vista al Mar"],isFeatured:true,isPopular:true,mapQuery:"Calzada+de+Amador+Panama"},
{id:"27",name:"Ramen Tokio",category:"Restaurantes",categoryId:"restaurantes",description:"Ramen auténtico con caldos preparados durante 18 horas. Tonkotsu, shoyu y miso con noodles frescos, chashu de cerdo y huevo marinado. Para los amantes del ramen serio.",address:"Calle 49 Este, Bella Vista, Local 2",hours:"Mar–Dom 12:00pm – 10:00pm",rating:4.6,reviews:178,image:"https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=80&h=80&fit=crop&auto=format",phone:"+507 6755-6677",instagram:"@ramen_tokio_pty",tags:["Ramen","Japonés","Tonkotsu","Noodles"],isNew:true,mapQuery:"Calle+49+Este+Bella+Vista+Panama"},
{id:"28",name:"El Asador Argentino",category:"Restaurantes",categoryId:"restaurantes",description:"Cortes premium de carne argentina al carbón. Asado de tira, bife de chorizo, entraña y costillas. Vinos argentinos seleccionados y empanadas caseras de entrada.",address:"Calle 53, Marbella, Local 8",hours:"Lun–Dom 12:00pm – 11:00pm",rating:4.7,reviews:312,image:"https://images.unsplash.com/photo-1544025162-d76694265947?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&h=80&fit=crop&auto=format",phone:"+507 6766-7788",instagram:"@asador_argentino_pty",facebook:"AsadorArgentinoPanama",tags:["Carne","Argentina","Parrilla","Vinos"],isFeatured:true,isPopular:true,mapQuery:"Calle+53+Marbella+Panama"},
{id:"29",name:"Veggie Garden",category:"Restaurantes",categoryId:"restaurantes",description:"Restaurante vegano y vegetariano con opciones creativas y nutritivas. Bowls, wraps, hamburguesas de plantas y postres sin azúcar refinada. Ambiente zen y tranquilo.",address:"Calle Samuel Lewis, Obarrio, Local 3",hours:"Lun–Sáb 8:00am – 9:00pm",rating:4.4,reviews:134,image:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1498579150354-977475b7ea0b?w=80&h=80&fit=crop&auto=format",phone:"+507 6777-8899",instagram:"@veggie_garden_pty",tags:["Vegano","Vegetariano","Saludable","Bowls"],isNew:true,mapQuery:"Calle+Samuel+Lewis+Obarrio+Panama"},
{id:"31",name:"Thai Orchid",category:"Restaurantes",categoryId:"restaurantes",description:"Gastronomía tailandesa auténtica con recetas de la región de Chiang Mai. Pad Thai, curry verde, tom yum y mango sticky rice. Sabores asiáticos únicos en Panamá.",address:"Calle 52, El Carmen, Local 11",hours:"Mar–Dom 12:00pm – 10:00pm",rating:4.5,reviews:156,image:"https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1547592166-23ac45744acd?w=80&h=80&fit=crop&auto=format",phone:"+507 6799-0011",instagram:"@thai_orchid_pty",tags:["Tailandés","Pad Thai","Curry","Asiático"],mapQuery:"Calle+52+El+Carmen+Panama"},
{id:"33",name:"Crepes & Co.",category:"Restaurantes",categoryId:"restaurantes",description:"Crêperie francesa con más de 40 variedades dulces y saladas. Ingredientes premium, masa artesanal y rellenos creativos. Ideal para desayuno, brunch o postre.",address:"Calle Uruguay 22, Casco Viejo",hours:"Miér–Lun 8:00am – 9:00pm",rating:4.4,reviews:167,image:"https://images.unsplash.com/photo-1519676867240-f03562e64548?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=80&h=80&fit=crop&auto=format",phone:"+507 6811-2233",instagram:"@crepes_co_pty",tags:["Crepes","Francés","Brunch","Postres"],isNew:true,mapQuery:"Calle+Uruguay+22+Casco+Viejo+Panama"},
{id:"34",name:"Cevichería Pacífico",category:"Restaurantes",categoryId:"restaurantes",description:"Ceviches y tiraditos estilo peruano-panameño. Leche de tigre de autor, mixto de mariscos y corvina marinada. Fresco, picante y lleno de sabor del océano.",address:"Av. Nacional, Costa del Este, Local 9",hours:"Lun–Dom 11:00am – 9:00pm",rating:4.7,reviews:234,image:"https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1563612116625-3012372fccce?w=80&h=80&fit=crop&auto=format",phone:"+507 6822-3344",instagram:"@cevicheria_pacifico",tags:["Ceviche","Mariscos","Peruano","Fresco"],isFeatured:true,mapQuery:"Costa+del+Este+Panama"},
{id:"35",name:"Panadería La Baguette",category:"Restaurantes",categoryId:"restaurantes",description:"Panadería francesa con croissants, baguettes y viennoiseries recién horneados cada mañana. Café de especialidad y sándwiches gourmet para el desayuno y almuerzo.",address:"Calle 57, Obarrio, Local 1",hours:"Lun–Sáb 6:30am – 7:00pm",rating:4.6,reviews:189,image:"https://images.unsplash.com/photo-1509440159596-0249088772ff?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=80&h=80&fit=crop&auto=format",phone:"+507 6833-4455",instagram:"@labaguette_pty",tags:["Pan","Croissants","Francés","Café"],isNew:true,mapQuery:"Calle+57+Obarrio+Panama"},
{id:"36",name:"Steak & Wine",category:"Restaurantes",categoryId:"restaurantes",description:"Restaurante de carnes y vinos con ambiente íntimo y elegante. Cortes de res certificados, selección de vinos del nuevo y viejo mundo y postres de autor.",address:"Punta Pacífica, Centro Comercial Multiplaza, Nivel 2",hours:"Lun–Dom 12:00pm – 11:30pm",rating:4.8,reviews:221,image:"https://images.unsplash.com/photo-1558030006-450675393462?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1544025162-d76694265947?w=80&h=80&fit=crop&auto=format",phone:"+507 6844-5566",instagram:"@steak_wine_pty",website:"steakwinepty.com",tags:["Carne","Vinos","Elegante","Gourmet"],isFeatured:true,mapQuery:"Multiplaza+Panama"},
{id:"37",name:"Brunch Club",category:"Restaurantes",categoryId:"restaurantes",description:"El mejor brunch de la ciudad los fines de semana. Pancakes, huevos benedictinos, waffles, smoothie bowls y mimosas. Reservaciones los sábados y domingos.",address:"Calle 56 Este, El Carmen",hours:"Sáb–Dom 8:00am – 3:00pm",rating:4.7,reviews:298,image:"https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=80&h=80&fit=crop&auto=format",phone:"+507 6855-6677",instagram:"@brunchclub_pty",tags:["Brunch","Pancakes","Fin de Semana","Mimosas"],isPopular:true,mapQuery:"Calle+56+Este+El+Carmen+Panama"},
{id:"38",name:"Empanadas La Villa",category:"Restaurantes",categoryId:"restaurantes",description:"Empanadas artesanales colombianas y panameñas. Más de 20 rellenos distintos: pollo, res, champiñones, queso y dulces. Perfectas para llevar o comer en el local.",address:"Tumba Muerto, Calle 2 #45",hours:"Lun–Dom 8:00am – 8:00pm",rating:4.4,reviews:267,image:"https://images.unsplash.com/photo-1601050690597-df0568f70950?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=80&h=80&fit=crop&auto=format",phone:"+507 6866-7788",facebook:"EmpanadasLaVilla",tags:["Empanadas","Colombiano","Artesanal","Para Llevar"],isNew:true,mapQuery:"Tumba+Muerto+Panama"},
{id:"39",name:"Smoothie Bar Verde",category:"Restaurantes",categoryId:"restaurantes",description:"Jugos naturales, smoothies, acai bowls y shots de bienestar. Todo sin azúcar añadida, con frutas frescas y superalimentos. Energía natural para tu día.",address:"Calle 50 y 61, San Francisco, Local 3",hours:"Lun–Sáb 7:00am – 7:00pm",rating:4.5,reviews:143,image:"https://images.unsplash.com/photo-1570696516188-ade861b84a49?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=80&h=80&fit=crop&auto=format",phone:"+507 6877-8899",instagram:"@smoothie_verde_pty",tags:["Jugos","Smoothies","Acai","Saludable"],mapQuery:"Calle+50+San+Francisco+Panama"},
{id:"41",name:"Wok Asian Kitchen",category:"Restaurantes",categoryId:"restaurantes",description:"Cocina asiática fusión con platos de China, Japón, Tailandia y Vietnam. Wok al fuego vivo, dim sum, pho y baos rellenos. Ambiente urbano y moderno.",address:"Calle 50, Torre Delta, Local B",hours:"Lun–Dom 11:00am – 10:00pm",rating:4.4,reviews:178,image:"https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1547592166-23ac45744acd?w=80&h=80&fit=crop&auto=format",phone:"+507 6899-0011",instagram:"@wok_asian_pty",tags:["Asiático","Wok","Dim Sum","Fusión"],mapQuery:"Calle+50+Torre+Delta+Panama"},
{id:"43",name:"Café Literario",category:"Restaurantes",categoryId:"restaurantes",description:"Café boutique con biblioteca interior. Café de origen único, tés artesanales y repostería fina. Eventos culturales semanales, lecturas y exposiciones de arte.",address:"Casco Viejo, Plaza Herrera #3",hours:"Mar–Dom 8:00am – 8:00pm",rating:4.7,reviews:134,image:"https://images.unsplash.com/photo-1463797221720-6b07e6426c24?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1587241321921-91a834d6d191?w=80&h=80&fit=crop&auto=format",phone:"+507 6911-2233",instagram:"@cafe_literario_pty",tags:["Café","Libros","Cultural","Repostería"],isFeatured:true,mapQuery:"Plaza+Herrera+Casco+Viejo+Panama"},
{id:"45",name:"Parrilla del Mar",category:"Restaurantes",categoryId:"restaurantes",description:"Pescados y mariscos a la parrilla con sazón caribeño. Pargo entero, langostinos al ajillo y pulpo a la brasa. Vistas al océano y música en vivo los viernes.",address:"Amador Causeway, Isla Perico, Local 7",hours:"Mar–Dom 12:00pm – 11:00pm",rating:4.8,reviews:243,image:"https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1563612116625-3012372fccce?w=80&h=80&fit=crop&auto=format",phone:"+507 6933-4455",instagram:"@parrilla_delmar",facebook:"ParrillaDelMarPty",tags:["Mariscos","Parrilla","Vista al Mar","Pargo"],isFeatured:true,isPopular:true,mapQuery:"Amador+Causeway+Panama"},
{id:"46",name:"Dulcería La Canela",category:"Restaurantes",categoryId:"restaurantes",description:"Dulces artesanales panameños y latinoamericanos. Alfajores, cocadas, polvorones, dulce de leche y tamales dulces. Ideal para regalos y celebraciones especiales.",address:"Santa Ana, Calle 12 #56",hours:"Lun–Sáb 8:00am – 7:00pm",rating:4.4,reviews:167,image:"https://images.unsplash.com/photo-1558326567-98ae2405596b?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?w=80&h=80&fit=crop&auto=format",phone:"+507 6944-5566",facebook:"DulceriaLaCanela",tags:["Dulces","Artesanal","Panameño","Regalos"],mapQuery:"Santa+Ana+Panama"},
{id:"49",name:"Café Azul",category:"Restaurantes",categoryId:"restaurantes",description:"Coffee shop especializado en métodos de extracción alternativos: V60, aeropress, chemex y cold brew. Baristas certificados y granos de origen sostenible.",address:"Av. Ricardo J. Alfaro, Local 22",hours:"Lun–Sáb 7:00am – 8:00pm",rating:4.7,reviews:156,image:"https://images.unsplash.com/photo-1498804103079-a6351b050096?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1587241321921-91a834d6d191?w=80&h=80&fit=crop&auto=format",phone:"+507 6977-8899",instagram:"@cafe_azul_pty",tags:["Café","Specialty Coffee","V60","Cold Brew"],isFeatured:true,mapQuery:"Avenida+Ricardo+Alfaro+Panama"},
{id:"51",name:"Restaurante Árabe Habibi",category:"Restaurantes",categoryId:"restaurantes",description:"Cocina árabe del Medio Oriente. Hummus casero, falafel, shawarma, kabab y baklava. Música árabe en vivo los jueves. Ideal para grupos y celebraciones.",address:"Calle 50, Los Ángeles, Local 6",hours:"Lun–Dom 12:00pm – 10:30pm",rating:4.4,reviews:143,image:"https://images.unsplash.com/photo-1542574271-7f3b92e6c821?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1478144592103-25e218a04891?w=80&h=80&fit=crop&auto=format",phone:"+507 6999-0011",facebook:"RestHabibiPty",tags:["Árabe","Shawarma","Hummus","Falafel"],mapQuery:"Calle+50+Los+Angeles+Panama"},
{id:"53",name:"Sandwichería Express",category:"Restaurantes",categoryId:"restaurantes",description:"Sándwiches artesanales rápidos y deliciosos. Pan horneado a diario, jamón y quesos importados, vegetales frescos y salsas caseras. El almuerzo ideal en 5 minutos.",address:"Av. España, Punta Pacífica, Local 2",hours:"Lun–Vie 7:00am – 5:00pm",rating:4.3,reviews:189,image:"https://images.unsplash.com/photo-1553909489-cd47e0907980?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=80&h=80&fit=crop&auto=format",phone:"+507 6012-2233",facebook:"SandwicheriaExpress",tags:["Sándwiches","Rápido","Almuerzo","Artesanal"],mapQuery:"Avenida+Espana+Punta+Pacifica+Panama"},
/* ── BELLEZA (19 total, ids 61–78) ── */
{id:"61",name:"Studio Glam",category:"Belleza",categoryId:"belleza",description:"Salón de belleza de alta gama con especialistas en coloración, extensiones y tratamientos de keratina brasileña. Ambiente lujoso y personalizado para cada clienta.",address:"Calle 50, Marbella, Torre HSBC, Local 2",hours:"Mar–Sáb 9:00am – 7:00pm",rating:4.8,reviews:167,image:"https://images.unsplash.com/photo-1560066984-138dadb4c035?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=80&h=80&fit=crop&auto=format",phone:"+507 6100-1122",instagram:"@studio_glam_pty",tags:["Coloración","Keratina","Extensiones","Premium"],isFeatured:true,mapQuery:"Calle+50+Marbella+Panama"},
{id:"63",name:"Barbería El Caballero",category:"Belleza",categoryId:"belleza",description:"Barbería clásica para hombres modernos. Cortes de cabello, afeitado con navaja, arreglo de barba y tratamientos capilares masculinos. Ambiente retro y relajado.",address:"Calle 47, Bella Vista, Local 3",hours:"Lun–Sáb 9:00am – 7:00pm",rating:4.6,reviews:198,image:"https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=80&h=80&fit=crop&auto=format",phone:"+507 6122-3344",instagram:"@barberia_elcaballero",tags:["Barbería","Hombres","Navaja","Barba"],isPopular:true,mapQuery:"Calle+47+Bella+Vista+Panama"},
{id:"65",name:"Centro Estética Renova",category:"Belleza",categoryId:"belleza",description:"Tratamientos estéticos faciales y corporales. Limpieza profunda, hidratación, radiofrecuencia y depilación láser. Profesionales certificados y equipos de última tecnología.",address:"Calle 50, Las Mercedes, Edificio Banco General, Local 1",hours:"Lun–Vie 9:00am – 6:00pm, Sáb 9:00am – 3:00pm",rating:4.5,reviews:145,image:"https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=80&h=80&fit=crop&auto=format",phone:"+507 6144-5566",website:"estrenova.com",tags:["Estética","Facial","Láser","Radiofrecuencia"],mapQuery:"Calle+50+Las+Mercedes+Panama"},
{id:"66",name:"Peluquería Infantil Ricitos",category:"Belleza",categoryId:"belleza",description:"Salón especializado en cortes para niños y niñas de 0 a 12 años. Ambiente divertido con juguetes y pantallas. Los mejores cortadores con paciencia y amor.",address:"El Dorado, Centro Comercial, Local 34",hours:"Mar–Dom 10:00am – 6:00pm",rating:4.8,reviews:267,image:"https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1595871151608-bc7abd1caca3?w=80&h=80&fit=crop&auto=format",phone:"+507 6155-6677",facebook:"RicitosPeluqueriaInfantil",tags:["Niños","Cortes Infantiles","Familiar","Divertido"],isPopular:true,mapQuery:"El+Dorado+Panama"},
{id:"78",name:"Beauty Express",category:"Belleza",categoryId:"belleza",description:"Servicios de belleza rápidos y asequibles. Manicure, pedicure básico, tinte express y cortes sencillos sin cita. La solución perfecta para quienes tienen poco tiempo.",address:"Av. José Agustín Arango, Tocumen, Local 3",hours:"Lun–Dom 9:00am – 8:00pm",rating:4.2,reviews:234,image:"https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1595871151608-bc7abd1caca3?w=80&h=80&fit=crop&auto=format",phone:"+507 6277-8899",facebook:"BeautyExpressPanama",tags:["Express","Sin Cita","Manicure","Asequible"],isPopular:true,mapQuery:"Tocumen+Panama"},
/* ── TRANSPORTE (12 total, ids 80–89) ── */
/* ── TURISMO (15 total, ids 90–101) ── */
{id:"93",name:"Bocas Adventure",category:"Turismo",categoryId:"turismo",description:"Paquetes de aventura en Bocas del Toro. Snorkel, kayak, pesca, tour en lancha por los cayos y delfines. La experiencia caribeña panameña más completa.",address:"Bocas del Toro, Isla Colón (agencia en el centro)",hours:"Lun–Dom 7:00am – 6:00pm",rating:4.8,reviews:234,image:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=80&h=80&fit=crop&auto=format",phone:"+507 6433-4455",instagram:"@bocas_adventure",website:"bocasadventure.com",tags:["Bocas del Toro","Snorkel","Kayak","Caribe"],isFeatured:true,isPopular:true,mapQuery:"Bocas+del+Toro+Panama"},
{id:"96",name:"Playa Los Destinos",category:"Turismo",categoryId:"turismo",description:"Agencia de viajes especializada en destinos de playa en Panamá y el Caribe. Paquetes a San Blas, Bocas, Contadora y Colón. Todo incluido con transporte.",address:"Av. Samuel Lewis, Piso 3, Of. 301",hours:"Lun–Vie 9:00am – 6:00pm",rating:4.5,reviews:134,image:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=80&h=80&fit=crop&auto=format",phone:"+507 6466-7788",instagram:"@playa_losdestinos",website:"playalosdestinos.com",tags:["Agencia","San Blas","Contadora","Todo Incluido"],isFeatured:true,mapQuery:"Avenida+Samuel+Lewis+Panama"},
/* ── SALUD adicionales ── */
{id:"200",name:"Farmacia San Rafael",category:"Salud",categoryId:"salud",description:"Farmacia con amplio surtido de medicamentos, vitaminas, suplementos y productos de cuidado personal. Farmacéuticos certificados y servicio de entrega a domicilio disponible.",address:"Calle 50, San Francisco, Local 3",hours:"Lun–Dom 7:00am – 11:00pm",rating:4.5,reviews:312,image:"https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=80&h=80&fit=crop&auto=format",phone:"+507 6201-1001",facebook:"FarmaciaSanRafael",tags:["Farmacia","Medicamentos","Vitaminas","Domicilio"],isPopular:true,mapQuery:"Calle+50+San+Francisco+Panama"},
{id:"201",name:"Centro Médico Familiar Vida",category:"Salud",categoryId:"salud",description:"Clínica familiar con médicos generales, pediatras y ginecólogos. Laboratorio clínico en sitio, rayos X digital y electrocardiogramas. Citas el mismo día.",address:"Av. Transistmica, Los Andes, Edificio Médico",hours:"Lun–Sáb 7:00am – 7:00pm",rating:4.6,reviews:198,image:"https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=80&h=80&fit=crop&auto=format",phone:"+507 6202-1002",instagram:"@centrovida_pty",tags:["Médicos","Laboratorio","Pediatría","Ginecología"],isFeatured:true,mapQuery:"Transistmica+Panama"},
{id:"202",name:"Óptica Visión Clara",category:"Salud",categoryId:"salud",description:"Centro óptico con exámenes de la vista, venta de lentes oftálmicos, de contacto y gafas de sol. Monturas nacionales e importadas. Entrega en 24 horas.",address:"Calle 49, Bella Vista, Local 8",hours:"Lun–Sáb 9:00am – 6:00pm",rating:4.7,reviews:145,image:"https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?w=80&h=80&fit=crop&auto=format",phone:"+507 6203-1003",instagram:"@optica_visionclara",tags:["Óptica","Lentes","Gafas","Examen Visual"],isNew:true,mapQuery:"Calle+49+Bella+Vista+Panama"},
{id:"203",name:"Psicología & Bienestar",category:"Salud",categoryId:"salud",description:"Centro de psicología clínica y terapia cognitivo-conductual. Atención individual, de pareja y familiar. Sesiones presenciales y en línea con psicólogos certificados.",address:"Paitilla, Av. Balboa, Torre Médica, Piso 4",hours:"Lun–Vie 8:00am – 7:00pm",rating:4.9,reviews:87,image:"https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=80&h=80&fit=crop&auto=format",phone:"+507 6204-1004",website:"psicologiabienestar.pty",tags:["Psicología","Terapia","Bienestar","En Línea"],isFeatured:true,mapQuery:"Paitilla+Panama"},
{id:"204",name:"Nutrición & Vida Sana",category:"Salud",categoryId:"salud",description:"Consultoría nutricional con planes alimenticios personalizados para pérdida de peso, deporte y salud digestiva. Nutricionistas certificadas con enfoque holístico.",address:"Calle 53, Marbella, Of. 201",hours:"Lun–Vie 8:00am – 5:00pm",rating:4.8,reviews:112,image:"https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=80&h=80&fit=crop&auto=format",phone:"+507 6205-1005",instagram:"@nutricion_vidasana",tags:["Nutrición","Dieta","Peso","Holístico"],isNew:true,mapQuery:"Calle+53+Marbella+Panama"},
{id:"126",name:"Smart Devices Store",category:"Tecnología",categoryId:"tecnologia",description:"Tienda especializada en dispositivos inteligentes: smartwatches, auriculares, cámaras de seguridad IP, drones y gadgets tecnológicos de las mejores marcas.",address:"Multiplaza Pacific, Punta Pacífica, Local 234",hours:"Lun–Dom 10:00am – 9:00pm",rating:4.5,reviews:198,image:"https://images.unsplash.com/photo-1761494296583-99b15e9063c5?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1565211604822-2641d0b081a6?w=80&h=80&fit=crop&auto=format",phone:"+507 6766-7788",instagram:"@smartdevices_pty",tags:["Smartwatch","Drones","Gadgets","Cámaras IP"],isNew:true,isPopular:true,mapQuery:"Multiplaza+Panama"},
/* ROPA */
{id:"136",name:"Jeans & Co.",category:"Ropa",categoryId:"ropa",description:"Tienda especializada en jeans y ropa casual para toda la familia. Marcas nacionales e internacionales, todas las tallas y cortes modernos a precios competitivos.",address:"Av. Central, Santa Ana, Local 45",hours:"Lun–Dom 9:00am – 8:00pm",rating:4.3,reviews:178,image:"https://images.unsplash.com/photo-1542272604-787c3835535d?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=80&h=80&fit=crop&auto=format",phone:"+507 6866-7788",facebook:"JeansCopty",tags:["Jeans","Casual","Familia","Tallas"],isPopular:true,mapQuery:"Avenida+Central+Santa+Ana+Panama"},
/* ── TRANSPORTE nuevos (ids 300–304) ── */
{id:"300",name:"Moto Flash Delivery",category:"Transporte",categoryId:"transporte",description:"Servicio de mensajería y domicilios en moto. Entregas en menos de 45 minutos en toda la ciudad. Ideal para documentos, paquetes pequeños y compras urgentes.",address:"Calle 34, San Miguelito, Local 8",hours:"Lun–Dom 7:00am – 10:00pm",rating:4.4,reviews:231,image:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&h=80&fit=crop&auto=format",phone:"+507 6300-0011",instagram:"@motoflash_pty",tags:["Mensajería","Domicilio","Moto","Rápido"],isNew:true,mapQuery:"San+Miguelito+Panama"},
{id:"301",name:"Bus Charter Panamá",category:"Transporte",categoryId:"transporte",description:"Alquiler de autobuses con aire acondicionado para excursiones, eventos corporativos y grupos escolares. Choferes con licencia profesional y puntualidad garantizada.",address:"Tocumen, Av. Principal #110",hours:"Lun–Sáb 6:00am – 8:00pm",rating:4.5,reviews:87,image:"https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=80&h=80&fit=crop&auto=format",phone:"+507 6301-0022",facebook:"BusCharterPty",tags:["Autobús","Charter","Grupos","Corporativo"],isFeatured:true,mapQuery:"Tocumen+Panama"},
{id:"302",name:"Taxi Seguro 24H",category:"Transporte",categoryId:"transporte",description:"Servicio de taxi privado disponible las 24 horas. Tarifas fijas al aeropuerto, hoteles y puntos turísticos. Vehículos con GPS y conductores verificados.",address:"Calle 50, Marbella (despacho central)",hours:"Todos los días 24 horas",rating:4.6,reviews:412,image:"https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=80&h=80&fit=crop&auto=format",phone:"+507 6302-0033",instagram:"@taxiseguro_pty",tags:["Taxi","24 horas","Aeropuerto","GPS"],isPopular:true,mapQuery:"Marbella+Panama"},
{id:"303",name:"Mudanzas Confiables",category:"Transporte",categoryId:"transporte",description:"Servicio profesional de mudanzas residenciales y empresariales. Empaque, carga, traslado y desempaque. Camiones climatizados para proteger muebles y equipos.",address:"Av. Transistmica, Tocumen, Bodega 4",hours:"Lun–Sáb 7:00am – 6:00pm",rating:4.3,reviews:98,image:"https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=80&h=80&fit=crop&auto=format",phone:"+507 6303-0044",facebook:"MudanzasConfiables",tags:["Mudanzas","Carga","Residencial","Empresarial"],mapQuery:"Transistmica+Tocumen+Panama"},
{id:"304",name:"Rent-A-Car Express",category:"Transporte",categoryId:"transporte",description:"Alquiler de autos económicos, sedanes y SUV con y sin chofer. Precios desde $35 al día. Kilometraje ilimitado, seguro incluido y entrega en el aeropuerto.",address:"Aeropuerto Internacional de Tocumen, Hall 2",hours:"Todos los días 6:00am – 11:00pm",rating:4.7,reviews:356,image:"https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=80&h=80&fit=crop&auto=format",phone:"+507 6304-0055",instagram:"@rentacar_express_pty",website:"rentacarexpress.com",tags:["Alquiler","Autos","Aeropuerto","SUV"],isFeatured:true,isPopular:true,mapQuery:"Aeropuerto+Tocumen+Panama"},
/* ── TURISMO nuevos (ids 305–309) ── */
{id:"305",name:"Canal & Miraflores Tours",category:"Turismo",categoryId:"turismo",description:"Visitas guiadas al Canal de Panamá con acceso preferencial a las esclusas de Miraflores. Incluye transporte, guía bilingüe y entrada al museo interactivo.",address:"Esclusas de Miraflores, Panamá Oeste",hours:"Todos los días 8:00am – 5:00pm",rating:4.9,reviews:521,image:"https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=80&h=80&fit=crop&auto=format",phone:"+507 6305-0066",instagram:"@canaltours_pty",website:"canalmiraflorestours.com",tags:["Canal de Panamá","Miraflores","Guiado","Bilingüe"],isFeatured:true,isPopular:true,mapQuery:"Miraflores+Locks+Panama"},
{id:"306",name:"San Blas Expeditions",category:"Turismo",categoryId:"turismo",description:"Expediciones a las Islas San Blas en velero y lancha. Convivencia con la comunidad Guna Yala, snorkel en arrecifes vírgenes y noche a bordo disponible.",address:"Marina Flamenco, Causeway de Amador",hours:"Vie–Dom (salidas programadas)",rating:4.8,reviews:298,image:"https://images.unsplash.com/photo-1439405326854-014607f694d7?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1439405326854-014607f694d7?w=80&h=80&fit=crop&auto=format",phone:"+507 6306-0077",instagram:"@sanblas_expeditions",website:"sanblasexpeditions.com",tags:["San Blas","Guna Yala","Velero","Snorkel"],isFeatured:true,mapQuery:"Marina+Flamenco+Amador+Panama"},
{id:"307",name:"Panamá Selvático",category:"Turismo",categoryId:"turismo",description:"Ecoturismo en el Parque Nacional Soberanía. Avistamiento de aves, senderismo en el Camino de Cruces y kayak en el Lago Gatún. Guías naturalistas certificados.",address:"Gamboa, Parque Nacional Soberanía",hours:"Lun–Dom 6:00am – 4:00pm",rating:4.7,reviews:167,image:"https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=80&h=80&fit=crop&auto=format",phone:"+507 6307-0088",instagram:"@pty_selvatico",tags:["Ecoturismo","Aves","Senderismo","Gatún"],isNew:true,mapQuery:"Gamboa+Panama"},
{id:"308",name:"Casco Viejo Walking Tours",category:"Turismo",categoryId:"turismo",description:"Recorridos a pie por el casco histórico patrimonio de la UNESCO. Arquitectura colonial, gastronomía local y arte urbano. Grupos de máximo 10 personas para mejor experiencia.",address:"Arco Chato, Casco Viejo (punto de encuentro)",hours:"Mar–Dom 8:30am y 3:30pm",rating:4.8,reviews:389,image:"https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=80&h=80&fit=crop&auto=format",phone:"+507 6308-0099",instagram:"@cascoviejo_walks",website:"cascoviejowalks.com",tags:["Casco Viejo","Patrimonio","A pie","UNESCO"],isPopular:true,mapQuery:"Casco+Viejo+Panama"},
{id:"309",name:"Volcán Barú Trek",category:"Turismo",categoryId:"turismo",description:"Ascenso guiado al Volcán Barú, el punto más alto de Panamá. Senderismo nocturno para ver el amanecer desde la cima con vista a ambos océanos. Equipamiento incluido.",address:"Boquete, Chiriquí (salidas desde la agencia)",hours:"Jue–Dom (salidas a las 11:00pm)",rating:4.9,reviews:143,image:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=80&h=80&fit=crop&auto=format",phone:"+507 6309-0100",instagram:"@baru_trek",tags:["Volcán Barú","Senderismo","Boquete","Aventura"],isFeatured:true,isNew:true,mapQuery:"Volcan+Baru+Boquete+Panama"},
/* ── ROPA nuevos (ids 310–314) ── */
{id:"310",name:"Taller de Costura Creativa",category:"Ropa",categoryId:"ropa",description:"Confección y arreglos de ropa a medida. Vestidos de novia, trajes formales y ropa casual personalizada. Diseños únicos con telas nacionales e importadas.",address:"El Chorrillo, Calle 20 #33",hours:"Lun–Sáb 9:00am – 6:00pm",rating:4.6,reviews:134,image:"https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=80&h=80&fit=crop&auto=format",phone:"+507 6310-0111",facebook:"TallerCosturaCreativa",tags:["Costura","A medida","Novia","Diseño"],isFeatured:true,mapQuery:"El+Chorrillo+Panama"},
{id:"311",name:"Deportes & Más",category:"Deportes",categoryId:"deportes",description:"Tienda de ropa y calzado deportivo. Nike, Adidas, Under Armour y marcas locales. Equipamiento para fútbol, natación, running y gimnasio. Asesoramiento especializado.",address:"Centro Comercial Albrook Mall, Local 312",hours:"Lun–Dom 10:00am – 9:00pm",rating:4.5,reviews:267,image:"https://images.unsplash.com/photo-1517649763962-0c623066013b?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1517649763962-0c623066013b?w=80&h=80&fit=crop&auto=format",phone:"+507 6311-0122",instagram:"@deportesymas_pty",facebook:"DeportesyMasPanama",tags:["Deportivo","Nike","Adidas","Running"],isPopular:true,mapQuery:"Albrook+Mall+Panama"},
{id:"325",name:"FitZone Gym & Suplementos",category:"Deportes",categoryId:"deportes",description:"Gimnasio moderno con equipos de última generación y tienda de suplementos deportivos. Clases de crossfit, spinning, yoga y musculación. Entrenadores certificados.",address:"Via Israel, San Francisco, Local 14",hours:"Lun–Vie 5:00am – 10:00pm | Sáb–Dom 7:00am – 8:00pm",rating:4.7,reviews:312,image:"https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=80&h=80&fit=crop&auto=format",phone:"+507 6325-0010",instagram:"@fitzone_pty",tags:["Gimnasio","Crossfit","Suplementos","Yoga"],isFeatured:true,isPopular:true,mapQuery:"Via+Israel+San+Francisco+Panama"},
{id:"326",name:"Cancha Real Fútbol",category:"Deportes",categoryId:"deportes",description:"Canchas de fútbol 5 y 7 sintéticas con iluminación LED. Alquiler por hora, torneos semanales y academia de fútbol para niños y adultos. Vestuarios y cafetería.",address:"Río Abajo, Calle 72 #15",hours:"Lun–Dom 7:00am – 11:00pm",rating:4.6,reviews:198,image:"https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=80&h=80&fit=crop&auto=format",phone:"+507 6326-0020",instagram:"@cancharealfutbol",tags:["Fútbol","Canchas","Academia","Torneos"],isNew:true,mapQuery:"Rio+Abajo+Panama"},
{id:"327",name:"Natación Competitiva Aqua",category:"Deportes",categoryId:"deportes",description:"Club de natación con piscina semiolímpica. Clases para bebés, niños y adultos. Entrenamiento competitivo con instructores federados. Hidroterapia y aqua aerobics.",address:"Paitilla, Av. Balboa, Edificio Aqua",hours:"Lun–Vie 6:00am – 9:00pm | Sáb 7:00am – 5:00pm",rating:4.8,reviews:145,image:"https://images.unsplash.com/photo-1530549387789-4c1017266635?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1530549387789-4c1017266635?w=80&h=80&fit=crop&auto=format",phone:"+507 6327-0030",instagram:"@aqua_natacion_pty",tags:["Natación","Piscina","Niños","Competitivo"],isPopular:true,mapQuery:"Paitilla+Balboa+Panama"},
{id:"312",name:"La Pollera Panameña",category:"Ropa",categoryId:"ropa",description:"Tienda especializada en trajes típicos panameños. Polleras de gala y montuna, tembleques, sombreros pintados y accesorios folklóricos para toda la familia.",address:"Av. Central, El Machetazo, 2do Piso",hours:"Lun–Sáb 9:00am – 7:00pm",rating:4.8,reviews:189,image:"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=80&h=80&fit=crop&auto=format",phone:"+507 6312-0133",facebook:"LaPollera_Pty",tags:["Pollera","Típico","Folklórico","Tradición"],isFeatured:true,isNew:true,mapQuery:"Avenida+Central+Panama"},
{id:"313",name:"Kids Fashion World",category:"Ropa",categoryId:"ropa",description:"Moda infantil de 0 a 14 años. Ropa de marca, conjuntos de fiesta, uniformes escolares y accesorios para niños. Tallas amplias y precios accesibles.",address:"Via España, Local 56, Bella Vista",hours:"Lun–Dom 10:00am – 8:00pm",rating:4.4,reviews:198,image:"https://images.unsplash.com/photo-1471286174890-9c112ac6e0d4?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1471286174890-9c112ac6e0d4?w=80&h=80&fit=crop&auto=format",phone:"+507 6313-0144",instagram:"@kidsfashion_pty",tags:["Infantil","Niños","Uniformes","Fiesta"],isPopular:true,mapQuery:"Via+Espana+Bella+Vista+Panama"},
{id:"314",name:"Vintage & Thrift Hub",category:"Ropa",categoryId:"ropa",description:"Tienda de ropa vintage y segunda mano seleccionada. Prendas únicas de los 70s, 80s y 90s a precios increíbles. Sostenibilidad de moda y moda sostenible.",address:"Casco Viejo, Calle 3a #14",hours:"Mar–Dom 11:00am – 7:00pm",rating:4.6,reviews:112,image:"https://images.unsplash.com/photo-1558171813-7a58c25e0e49?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1558171813-7a58c25e0e49?w=80&h=80&fit=crop&auto=format",phone:"+507 6314-0155",instagram:"@vintage_thrift_pty",tags:["Vintage","Segunda mano","Sostenible","70s 80s"],isNew:true,mapQuery:"Casco+Viejo+Panama"},
/* ── TECNOLOGÍA nuevos (ids 315–319) ── */
{id:"315",name:"Code Academy Panamá",category:"Tecnología",categoryId:"tecnologia",description:"Academia de programación para niños, jóvenes y adultos. Cursos de Python, desarrollo web, diseño UX y robótica. Modalidad presencial y online con certificación.",address:"Calle 50, San Francisco, Edificio Metrobank, Of. 5A",hours:"Lun–Sáb 8:00am – 7:00pm",rating:4.8,reviews:156,image:"https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=80&h=80&fit=crop&auto=format",phone:"+507 6315-0166",instagram:"@codeacademy_pty",website:"codeacademypty.com",tags:["Programación","Python","Web","Cursos"],isFeatured:true,isNew:true,mapQuery:"Calle+50+San+Francisco+Panama"},
{id:"316",name:"PrintTech 3D",category:"Tecnología",categoryId:"tecnologia",description:"Servicios de impresión 3D bajo demanda. Prototipos industriales, figuras personalizadas, piezas de repuesto y modelos arquitectónicos. Materiales PLA, ABS y resina.",address:"Zona Industrial de Panamá, Galpón 12",hours:"Lun–Vie 8:00am – 5:00pm",rating:4.5,reviews:89,image:"https://images.unsplash.com/photo-1615461066159-fea0960485d5?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1615461066159-fea0960485d5?w=80&h=80&fit=crop&auto=format",phone:"+507 6316-0177",instagram:"@printtech3d_pty",website:"printtech3d.com",tags:["Impresión 3D","Prototipos","Resina","PLA"],isNew:true,mapQuery:"Zona+Industrial+Panama"},
{id:"317",name:"TechHogar Smart Home",category:"Tecnología",categoryId:"tecnologia",description:"Instalación de hogares inteligentes. Domótica, iluminación automatizada, cerraduras digitales, termostatos inteligentes y asistentes de voz. Marcas Google, Amazon y Samsung.",address:"Punta Pacífica, Av. Balboa, Torre Globos, Of. 2C",hours:"Lun–Vie 9:00am – 6:00pm",rating:4.7,reviews:67,image:"https://images.unsplash.com/photo-1558002038-1055907df827?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1558002038-1055907df827?w=80&h=80&fit=crop&auto=format",phone:"+507 6317-0188",instagram:"@techhogar_pty",website:"techhogarpty.com",tags:["Smart Home","Domótica","Google Home","Automatización"],isFeatured:true,mapQuery:"Punta+Pacifica+Panama"},
{id:"318",name:"PC Armados Pro",category:"Tecnología",categoryId:"tecnologia",description:"Ensamblaje de computadoras de escritorio personalizadas para gaming, trabajo y diseño. Selección de componentes según presupuesto, con garantía de un año en mano de obra.",address:"Via España, Plaza Regency, Local 7",hours:"Lun–Sáb 9:00am – 6:00pm",rating:4.6,reviews:143,image:"https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=80&h=80&fit=crop&auto=format",phone:"+507 6318-0199",facebook:"PCArmadosPro",tags:["Gaming PC","Ensamblaje","Componentes","Diseño"],isPopular:true,mapQuery:"Via+Espana+Panama"},
{id:"319",name:"Cybersec Panamá",category:"Tecnología",categoryId:"tecnologia",description:"Consultoría en ciberseguridad para empresas. Auditorías de seguridad, protección de datos, capacitación al personal y respuesta a incidentes. Certificados ISO 27001.",address:"Av. Samuel Lewis, Torres de la Américas, Piso 22",hours:"Lun–Vie 8:00am – 5:00pm",rating:4.8,reviews:54,image:"https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=80&h=80&fit=crop&auto=format",phone:"+507 6319-0200",website:"cybersecpty.com",tags:["Ciberseguridad","ISO 27001","Auditoría","Empresas"],isFeatured:true,mapQuery:"Torres+Americas+Panama"},
/* ── HOGAR nuevos (ids 320–324) ── */
{id:"320",name:"Muebles & Diseño Interiors",category:"Hogar",categoryId:"hogar",description:"Tienda de muebles y decoración para sala, comedor y dormitorios. Diseño de interiores personalizado, muebles a medida y asesoría gratuita en tu hogar.",address:"Via Ricardo J. Alfaro, Megaplex, Local 8",hours:"Lun–Dom 10:00am – 8:00pm",rating:4.6,reviews:178,image:"https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=80&h=80&fit=crop&auto=format",phone:"+507 6320-0211",instagram:"@muebles_interiors_pty",facebook:"MueblesInteriors",tags:["Muebles","Diseño de Interiores","Sala","Dormitorio"],isFeatured:true,isPopular:true,mapQuery:"Via+Ricardo+Alfaro+Panama"},
{id:"321",name:"Jardín Tropical Panamá",category:"Hogar",categoryId:"hogar",description:"Vivero y servicio de jardinería. Plantas tropicales, árboles frutales, macetas decorativas y diseño de jardines residenciales. Mantenimiento mensual disponible.",address:"Calle Los Ríos, Ancón, Km 2",hours:"Lun–Dom 7:00am – 5:00pm",rating:4.5,reviews:134,image:"https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=80&h=80&fit=crop&auto=format",phone:"+507 6321-0222",facebook:"JardinTropicalPty",tags:["Plantas","Jardines","Vivero","Mantenimiento"],isNew:true,mapQuery:"Ancon+Panama"},
{id:"322",name:"ElectroCasa Panamá",category:"Hogar",categoryId:"hogar",description:"Electrodomésticos, licuadoras, refrigeradoras, lavadoras y secadoras de las mejores marcas. Financiamiento a 24 meses y servicio técnico posventa incluido.",address:"Transistmica, El Dorado, Centro Comercial, Local 10",hours:"Lun–Dom 9:00am – 8:00pm",rating:4.4,reviews:312,image:"https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=80&h=80&fit=crop&auto=format",phone:"+507 6322-0233",instagram:"@electrocasa_pty",website:"electrocasa.pty",tags:["Electrodomésticos","Lavadora","Refrigeradora","Financiamiento"],isPopular:true,mapQuery:"El+Dorado+Panama"},
{id:"323",name:"Pinturas & Acabados RD",category:"Hogar",categoryId:"hogar",description:"Venta de pinturas, barnices y acabados para interior y exterior. Servicio de pintura profesional a domicilio. Paleta de más de 500 colores y mezclas personalizadas.",address:"Av. Balboa, Santa Ana, Local 22",hours:"Lun–Sáb 7:30am – 6:00pm",rating:4.3,reviews:98,image:"https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=80&h=80&fit=crop&auto=format",phone:"+507 6323-0244",facebook:"PinturasRD",tags:["Pintura","Acabados","Domicilio","500 colores"],mapQuery:"Santa+Ana+Panama"},
{id:"324",name:"Alarmas & Seguridad Home",category:"Hogar",categoryId:"hogar",description:"Instalación de sistemas de alarma, cámaras de vigilancia y control de acceso para residencias y condominios. Monitoreo 24/7 y respuesta inmediata ante emergencias.",address:"Calle 73, San Francisco, Edificio Tower, Of. 101",hours:"Lun–Vie 8:00am – 5:30pm",rating:4.7,reviews:167,image:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&h=80&fit=crop&auto=format",phone:"+507 6324-0255",instagram:"@alarmas_home_pty",website:"alarmashogar.pty",tags:["Alarmas","Cámaras","Seguridad","Monitoreo 24/7"],isFeatured:true,mapQuery:"San+Francisco+Panama"}];

// cargar favoritos del storage
const _savedFavs = localStorage.getItem('fynderFavorites');
let favorites = new Set();
if(_savedFavs){
  try {
    const parsed = JSON.parse(_savedFavs);
    // Solo mantener IDs que existen en BUSINESSES
    parsed.forEach(id => { if(BUSINESSES.find(b=>b.id===id)) favorites.add(id); });
    // Actualizar localStorage con solo los válidos
    localStorage.setItem('fynderFavorites', JSON.stringify([...favorites]));
  } catch(e){ favorites = new Set(); }
}

let currentPage="home",previousPage="home",dirViewMode="grid",dirActiveCategory="",modalBusinessId=null; 

 

function starsHTML(r){const f=Math.round(r);let s='';for(let i=1;i<=5;i++)s+=`<svg class="${i<=f?'star-on':'star-off'}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="0"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;return s;} 

 

function gridCardHTML(b){
  const isFav=favorites.has(b.id);
  const badge=b.isNew?`<span class="bcard-badge new">NUEVO</span>`:b.isFeatured?`<span class="bcard-badge featured">DESTACADO</span>`:'';
  const dealBadge=b.deal?`<span class="bcard-badge deal" style="background:${b.deal.color}"><i class="fas fa-tags"></i> ${b.deal.label}</span>`:'';
  return`<div class="bcard" onclick="openModal('${b.id}')"><div class="bcard-img"><img src="${b.image}" alt="${b.name}" loading="lazy" onerror="this.closest('.bcard').style.display='none'"/><div class="bcard-img-overlay"></div>${badge}${dealBadge}<button class="bcard-fav${isFav?' active':''}" onclick="event.stopPropagation();toggleFav('${b.id}')" data-fav-id="${b.id}" data-fav-size="md">${_heartSVG(isFav,'md')}</button></div><div class="bcard-body"><div class="bcard-row1"><span class="bcard-name">${b.name}</span><div class="bcard-rating"><svg style="width:12px;height:12px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><polygon fill="#F4D35E" stroke="#F4D35E" points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><span class="bcard-rating-val">${b.rating}</span></div></div>${b.deal?`<p class="bcard-deal-strip"><i class="fas fa-tag"></i> ${b.deal.desc}</p>`:''}<p class="bcard-desc line-clamp-2">${b.description}</p><div class="bcard-hours"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>${b.hours}</div><button class="bcard-btn" onclick="event.stopPropagation();openModal('${b.id}')">Ver más →</button></div></div>`;
}

function listCardHTML(b){
  const isFav=favorites.has(b.id);
  const tags=b.tags.slice(0,3).map(t=>`<span class="tag tag-teal">${t}</span>`).join('');
  const dealTag=b.deal?`<span class="tag" style="background:color-mix(in srgb,${b.deal.color} 12%,white);color:${b.deal.color};border:1px solid ${b.deal.color}40"><i class="fas fa-tags" style="font-size:.6rem"></i> ${b.deal.label} · ${b.deal.desc}</span>`:'';
  return`<div class="bcard-list" onclick="openModal('${b.id}')"><div class="bcard-list-img"><img src="${b.image}" alt="${b.name}" loading="lazy" style="width:100%;height:100%;object-fit:cover" onerror="this.closest('.bcard-list').style.display='none'"/></div><div class="bcard-list-body"><div><div class="bcard-list-top"><span class="bcard-list-name">${b.name}</span><button onclick="event.stopPropagation();toggleFav('${b.id}')" style="background:none;border:none;cursor:pointer;flex-shrink:0;padding:2px" data-fav-id="${b.id}" data-fav-size="sm">${_heartSVG(isFav,'sm')}</button></div><p class="bcard-list-desc line-clamp-2">${b.description}</p><div class="bcard-list-tags">${tags}${dealTag}</div></div><div class="bcard-list-meta"><div class="bcard-list-meta-item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>${b.hours}</div><div class="bcard-list-meta-item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>${b.address.split(',')[0]}</div><div class="bcard-list-rating"><div class="stars">${starsHTML(b.rating)}</div><strong style="font-size:.75rem;color:#1F2937">${b.rating}</strong><span style="font-size:.75rem;color:#6B7280">(${b.reviews})</span></div></div></div></div>`;
}
function goPage(p){
    // Si la página no existe, ignorar silenciosamente
    const target = document.getElementById('page-'+p);
    if(!target){ console.warn('goPage: no existe page-'+p); return; }

    // Guardar la página anterior solo si NO es una página legal (para no perder el origen real)
    const legalPages = ['terms','privacy'];
    const noHistoryPages = ['messages','chat','chat-profile'];
    if(!legalPages.includes(currentPage) && !noHistoryPages.includes(currentPage)){
        previousPage = currentPage;
    }

    document.querySelectorAll('.page').forEach(x=>x.classList.remove('active'));
    target.classList.add('active');
    currentPage = p;

    const navbar  = document.getElementById('navbar');
    const noNavPages = ['login','register','terms','privacy','messages','chat','chat-profile'];
    navbar.style.display = noNavPages.includes(p) ? 'none' : 'block';

    // Actualizar el botón "Volver" de las páginas legales con el destino correcto
    if(legalPages.includes(p)){
        const backBtns = document.querySelectorAll('#page-'+p+' .back-legal-btn');
        const labels = { home:'Inicio', register:'Crear cuenta', login:'Iniciar sesión', directory:'Directorio', favorites:'Guardados', business:'Registrar negocio', profile:'Mi perfil', plans:'Planes', support:'Soporte', about:'Sobre FYNDER' };
        const label = labels[previousPage] || 'Volver';
        backBtns.forEach(btn => {
            btn.setAttribute('data-back', previousPage);
            btn.innerHTML = `<i class="fas fa-arrow-left"></i> ${label}`;
        });
    }

    // Reset scroll state before updateNav so on-hero works immediately on new page
    window.__scrolled = false;
    document.getElementById('navbar').classList.remove('scrolled');
    updateNav();
    window.scrollTo({top:0,behavior:'smooth'});

    if(p==='directory') renderDirectory();
    if(p==='favorites') renderFavorites();
    if(p==='profile')   loadProfile();
    if(p==='dashboard') loadDashboard();
    if(p==='fynder')    initFynderAnimations();
    if(p==='about')     initAboutPage();
    if(p==='map')       initMap();
    if(p==='settings')  initSettingsPage();
    if(p==='messages')  {
      if(typeof msgSwitchTab==='function') msgSwitchTab('chats');
      if(typeof updateMsgBadge==='function') updateMsgBadge();
      // En desktop, mostrar welcome si no hay chat activo
      if(window.innerWidth >= 769 && !_activeChatBizId) {
        const welcome  = document.getElementById('waWelcome');
        const chatArea = document.getElementById('waChatArea');
        if(welcome)  welcome.style.display  = 'flex';
        if(chatArea) chatArea.style.display = 'none';
      }
    }
    if(p!=='messages' && p!=='chat') { if(typeof updateMsgBadge==='function') updateMsgBadge(); }

    // La página de mensajes siempre oculta el navbar (tiene su propio header)
}

function goBack(){
    goPage(previousPage || 'home');
}

function updateNav(){
    const isHero = (currentPage==='home' || currentPage==='about' || currentPage==='fynder') && !window.__scrolled;

    // Nav links activos + on-hero
    ['home','directory','favorites','messages'].forEach(p=>{
        const el=document.getElementById('nl-'+p);
        if(!el) return;
        el.classList.toggle('active', p===currentPage);
        el.classList.toggle('on-hero', isHero);
    });
    const lt = document.getElementById('logoText');
    if(lt) lt.classList.toggle('on-hero', isHero);

    // Botones y nombre de usuario: on-hero mientras estamos en el hero sin scroll
    const logged = !!localStorage.getItem('fynderLogged');
    const login   = document.getElementById('navBtnLogin');
    const logout  = document.getElementById('navBtnLogout');
    const profile = document.getElementById('navBtnProfile');
    const uname   = document.getElementById('userName');

    if(login)   login.style.display   = logged ? 'none'         : 'inline-flex';
    if(logout)  logout.style.display  = logged ? 'inline-flex'  : 'none';
    if(profile) profile.style.display = logged ? 'inline-flex'  : 'none';
    if(uname && !logged) uname.textContent = '';

    const dashboard = document.getElementById('navBtnDashboard');
    if(dashboard) dashboard.style.display = logged ? 'inline-flex' : 'none';

    [logout, profile].forEach(el => { if(el) el.classList.toggle('on-hero', isHero); });
    if(login)  login.classList.toggle('on-hero', isHero);

    const dashBtn = document.getElementById('navBtnDashboard');
    if(dashBtn) dashBtn.classList.toggle('on-hero', isHero);

    const tealBtn = document.querySelector('#navbar .btn-teal');
    if(tealBtn) tealBtn.classList.toggle('on-hero', isHero);

    if(uname) uname.classList.toggle('on-hero', isHero);

    // nav-icon-btn on-hero (perfil, dashboard compactos)
    document.querySelectorAll('.nav-icon-btn').forEach(el => el.classList.toggle('on-hero', isHero));
    // nav-msg-btn on-hero
    const msgNavBtn = document.getElementById('navMsgBtn');
    if(msgNavBtn) msgNavBtn.classList.toggle('on-hero', isHero);
    const b=document.getElementById('navBadge');
    if(b){ b.textContent=favorites.size; b.style.display=favorites.size>0?'flex':'none'; }
    const fc=document.getElementById('favsCount');
    if(fc) fc.textContent=`${favorites.size} negocio${favorites.size!==1?'s':''} guardado${favorites.size!==1?'s':''}`;

    // Sincronizar drawer móvil con estado de sesión
    if (typeof updateMobileMenuActions === 'function') updateMobileMenuActions();

    // Resaltar el item activo en el menú lateral (drawer)
    const pageToDrawerBtn = {
        'home':      0,
        'directory': 1,
        'favorites': 2,
        'plans':     3,
        'about':     4,
        'fynder':    5,
        'blog':      6,
        'support':   7,
        'map':       8
    };
    const drawerBtns = document.querySelectorAll('.mobile-menu-nav button:not(.mobile-menu-nav-small)');
    drawerBtns.forEach((btn, i) => {
        const isActive = i === pageToDrawerBtn[currentPage];
        btn.classList.toggle('active', isActive);
    });
}

function goDirectoryQuery(q,cat=''){document.getElementById('dirSearch').value=q;dirActiveCategory=cat;goPage('directory');} 

function heroSearchGo(){const q=document.getElementById('heroSearch').value.trim();goDirectoryQuery(q);} 

window.__scrolled=false; 

window.addEventListener('scroll',()=>{const s=window.scrollY>40;if(s!==window.__scrolled){window.__scrolled=s;document.getElementById('navbar').classList.toggle('scrolled',s);updateNav();}},{passive:true}); 

function toggleFav(id){
  const wasFav = favorites.has(id);
  favorites.has(id)?favorites.delete(id):favorites.add(id);
  localStorage.setItem('fynderFavorites',JSON.stringify([...favorites]));
  updateNav();
  refreshFavBtns(id);
  if(currentPage==='favorites') renderFavorites();
  if(modalBusinessId===id) updateModalFavBtn();

  // Notificación real al guardar (no al quitar)
  if (!wasFav) {
    const biz = BUSINESSES.find(b => String(b.id) === String(id));
    if (biz) {
      pushNotification({
        type:  'fav',
        title: `Guardaste "${biz.name}"`,
        body:  biz.description ? biz.description.slice(0, 80) + (biz.description.length > 80 ? '…' : '') : 'Negocio guardado en tus favoritos.',
        bizId: biz.id,
        image: biz.image || null
      });
    }
  }
}

function _heartSVG(isFav, size){
  const fill   = isFav ? '#EF4444' : 'none';
  const stroke = isFav ? '#EF4444' : (size==='sm' ? '#D1D5DB' : '#9CA3AF');
  const w = size==='sm' ? 17 : 15;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${w}" viewBox="0 0 24 24" fill="${fill}" stroke="${stroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`;
}

function refreshFavBtns(id){
  const isFav = favorites.has(id);
  document.querySelectorAll(`[data-fav-id="${id}"]`).forEach(btn => {
    const size = btn.dataset.favSize || 'md';
    btn.classList.toggle('active', isFav);
    btn.innerHTML = _heartSVG(isFav, size);
  });
}

function openModal(id){
  const b=BUSINESSES.find(x=>x.id===id);
  if(!b)return;
  modalBusinessId=id;

  // Imagen y cabecera
  document.getElementById('modalImg').src=b.image;
  document.getElementById('modalImg').alt=b.name;
  document.getElementById('modalLogo').src=b.logo;
  document.getElementById('modalName').textContent=b.name;
  document.getElementById('modalCat').textContent=b.category;
  document.getElementById('modalStars').innerHTML=starsHTML(b.rating);
  document.getElementById('modalRating').textContent=b.rating;
  document.getElementById('modalReviews').textContent=`(${b.reviews} reseñas)`;
  document.getElementById('modalDesc').textContent=b.description;

  // Tags
  const cat=CATEGORIES.find(c=>c.id===b.categoryId);
  document.getElementById('modalTags').innerHTML=b.tags.map(t=>`<span class="modal-tag" style="background:${cat?.bg||'#E6F5F4'};color:${cat?.color||'#67B8B4'}">${t}</span>`).join('');

  // Info rows
  const irows=[
    {icon:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',label:'Dirección',val:b.address},
    {icon:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',label:'Horario',val:b.hours},
    {icon:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 12 19.79 19.79 0 0 1 1.93 3.38 2 2 0 0 1 3.91 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',label:'Teléfono',val:b.phone},
    ...(b.website?[{icon:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>',label:'Web',val:b.website}]:[])
  ];
  document.getElementById('modalInfo').innerHTML=irows.map(i=>`<div class="info-row"><div class="info-icon">${i.icon}</div><div><div class="info-label">${i.label}</div><div class="info-val">${i.val}</div></div></div>`).join('');

  // Redes sociales
  const hasSocial=b.instagram||b.facebook;
  document.getElementById('modalSocialWrap').style.display=hasSocial?'block':'none';
  if(hasSocial) document.getElementById('modalSocial').innerHTML=
    (b.instagram?`<button class="btn-ig" onclick="window.open('https://instagram.com/${b.instagram.replace('@','')}','_blank')"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>${b.instagram}</button>`:'') +
    (b.facebook?`<button class="btn-fb" onclick="window.open('https://facebook.com/${b.facebook}','_blank')"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>${b.facebook}</button>`:'');

  // Botones de acción: contactar y compartir
  const contactBtn=document.getElementById('modalContactBtn');
  if(contactBtn) contactBtn.onclick=()=>{ window.open('tel:'+b.phone.replace(/\s|\(|\)|-/g,''),'_self'); };
  const shareBtn=document.getElementById('modalShareBtn');
  if(shareBtn) shareBtn.onclick=()=>shareModalBusiness();

  // Mapa embed (Google Maps)
  const mapWrap=document.getElementById('modalMapWrap');
  if(mapWrap){
    const q=encodeURIComponent((b.mapQuery||b.address).replace(/\+/g,' ')+', Panamá');
    mapWrap.innerHTML=`<iframe
      class="modal-map-iframe"
      src="https://maps.google.com/maps?q=${q}&output=embed&z=16&hl=es"
      frameborder="0"
      allowfullscreen
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
      title="Ubicación de ${b.name}"></iframe>
    <a class="modal-map-ext-link" href="https://www.google.com/maps/search/?api=1&query=${q}" target="_blank" rel="noopener">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
      Ver en Google Maps
    </a>`;
  }

  // Reseñas
  renderModalReviews(b.id, cat);

  updateModalFavBtn();
  document.getElementById('modalOverlay').classList.remove('hide');
  document.body.style.overflow='hidden';
}

/* ── Helpers de likes para reseñas estáticas ── */
// Genera un ID estable a partir del bizId + nombre + fecha de la reseña
function _staticReviewId(bizId, r) {
  return bizId + '_' + (r.name || '').replace(/\s/g,'') + '_' + (r.date || '').replace(/\s/g,'');
}

// Devuelve los likes de una reseña estática — los genera random la primera vez y los persiste
function _getStaticReviewLikes(sid, r) {
  const store = JSON.parse(localStorage.getItem('fynderStaticRevLikes') || '{}');
  if(store[sid] === undefined) {
    // Generar likes random seeded (entre 3 y 48) según el texto para consistencia
    let seed = 0;
    const str = (r.name || '') + (r.text || '');
    for(let i = 0; i < str.length; i++) seed = (seed * 31 + str.charCodeAt(i)) & 0xFFFFFF;
    store[sid] = 3 + (seed % 46);
    localStorage.setItem('fynderStaticRevLikes', JSON.stringify(store));
  }
  return store[sid];
}

// Dar/quitar like a una reseña estática
function likeStaticReview(bizId, sid, btn) {
  const likedKey = 'fynderStaticRevLiked_' + bizId;
  const liked = JSON.parse(localStorage.getItem(likedKey) || '[]');
  const store = JSON.parse(localStorage.getItem('fynderStaticRevLikes') || '{}');

  if(liked.includes(sid)) {
    // quitar like
    store[sid] = Math.max(0, (store[sid] || 0) - 1);
    liked.splice(liked.indexOf(sid), 1);
    if(btn) btn.classList.remove('liked');
  } else {
    // dar like
    store[sid] = (store[sid] || 0) + 1;
    liked.push(sid);
    if(btn) {
      btn.classList.add('liked');
      btn.classList.add('like-pop');
      setTimeout(() => btn && btn.classList.remove('like-pop'), 350);
    }
  }
  localStorage.setItem('fynderStaticRevLikes', JSON.stringify(store));
  localStorage.setItem(likedKey, JSON.stringify(liked));
  // Actualizar contador sin re-renderizar
  if(btn) {
    const countEl = btn.querySelector('.review-like-count');
    if(countEl) countEl.textContent = store[sid];
  }
  // Re-renderizar para reordenar
  const b = BUSINESSES.find(x => String(x.id) === String(bizId));
  const cat = b ? CATEGORIES.find(c => c.id === b.categoryId) : null;
  renderModalReviews(bizId, cat);
}

function renderModalReviews(bizId, cat){
  const wrap=document.getElementById('modalReviewsWrap');
  if(!wrap) return;
  wrap.style.display='block';
  const staticList=REVIEWS[bizId]||[];
  const userComments=_getBizComments(bizId);
  const color=cat?.color||'#67B8B4';
  const logged=!!localStorage.getItem('fynderLogged');
  const user=JSON.parse(localStorage.getItem('fynderUser')||'null');

  // Convertir fecha "mar 2026" / "10 jul. 2025" a timestamp para ordenar
  const _MONTHS={'ene':0,'feb':1,'mar':2,'abr':3,'may':4,'jun':5,'jul':6,'ago':7,'sep':8,'oct':9,'nov':10,'dic':11};
  function _dateToTs(dateStr) {
    if(!dateStr) return 0;
    const parts = dateStr.toLowerCase().replace('.','').split(/\s+/);
    if(parts.length === 2) { // "mar 2026"
      const m = _MONTHS[parts[0]] ?? 0;
      return new Date(parseInt(parts[1]), m, 1).getTime();
    }
    if(parts.length === 3) { // "10 jul 2025"
      const m = _MONTHS[parts[1]] ?? 0;
      return new Date(parseInt(parts[2]), m, parseInt(parts[0])).getTime();
    }
    return 0;
  }

  // Unificar todas las reseñas en un solo array normalizado
  const allReviews = [
    ...staticList.map(r => {
      const sid = _staticReviewId(bizId, r);
      return { type:'static', data:r, ts: _dateToTs(r.date), likes: _getStaticReviewLikes(sid, r) };
    }),
    ...userComments.map(c => ({ type:'user', data:c, ts: parseInt(c.id) || _dateToTs(c.date), likes: c.likes || 0 }))
  ];

  // Ordenar: primero por likes DESC, empate por fecha más reciente
  allReviews.sort((a, b) => {
    const likeDiff = b.likes - a.likes;
    if(likeDiff !== 0) return likeDiff;
    return b.ts - a.ts;
  });

  const reviewsHTML = allReviews.map(item => {
    if(item.type === 'static') {
      const r = item.data;
      const filled = r.stars;
      const stars = [1,2,3,4,5].map(i=>`<svg style="width:13px;height:13px;fill:${i<=filled?'#F4D35E':'#E5E7EB'};flex-shrink:0" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`).join('');
      // Generar/recuperar likes para reseña estática
      const sid = _staticReviewId(bizId, r);
      const sLikes = _getStaticReviewLikes(sid, r);
      const sLikedKey = 'fynderStaticRevLiked_' + bizId;
      const sLiked = JSON.parse(localStorage.getItem(sLikedKey) || '[]');
      const sIsLiked = sLiked.includes(sid);
      return `<div class="review-card">
        <div class="review-header">
          <div class="review-avatar" style="background:linear-gradient(135deg,${color},#2F5BB7)">${r.avatar}</div>
          <div class="review-meta">
            <span class="review-name">${r.name}</span>
            <div class="review-stars">${stars}</div>
          </div>
          <span class="review-date">${r.date}</span>
        </div>
        <p class="review-text">${r.text}</p>
        <div class="review-actions">
          <button class="review-like-btn${sIsLiked ? ' liked' : ''}" onclick="likeStaticReview('${bizId}','${sid}',this)">
            <i class="fas fa-heart"></i> <span class="review-like-count">${sLikes}</span>
          </button>
        </div>
      </div>`;
    } else {
      const c = item.data;
      const isOwn = logged && user && c.userId === (user.email||user.name);
      let avStyle, avInner;
      if(c.avatarPhoto) {
        avStyle=`background:transparent;overflow:hidden;padding:0`;
        avInner=`<img src="${c.avatarPhoto}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;display:block" alt="av">`;
      } else if(c.avatarPreset) {
        avStyle=`background:#F0FEFE;font-size:1rem`;
        avInner=c.avatarPreset;
      } else {
        const bg=c.avatarInitBg||ART_COMMENT_COLORS[c.colorIdx||0];
        avStyle=`background:${bg};font-weight:700;font-size:.875rem;color:#fff;font-family:'Poppins',sans-serif`;
        avInner=c.initial;
      }
      const starsHTML = c.stars ? [1,2,3,4,5].map(i=>`<svg style="width:13px;height:13px;fill:${i<=c.stars?'#F4D35E':'#E5E7EB'};flex-shrink:0" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`).join('') : '';
      const bizLikedKey = 'fynderBizRevLikes_' + bizId;
      const bizLiked = JSON.parse(localStorage.getItem(bizLikedKey) || '[]');
      const isLiked = bizLiked.includes(c.id);
      return `<div class="review-card" id="bizc-${c.id}">
        <div class="review-header">
          <div class="review-avatar" style="${avStyle}">${avInner}</div>
          <div class="review-meta">
            <span class="review-name">${c.name}</span>
            <div class="review-stars">${starsHTML}</div>
          </div>
          <span class="review-date">${c.date}</span>
          ${isOwn?`<button onclick="deleteBizComment('${bizId}','${c.id}')" title="Eliminar" style="background:none;border:none;cursor:pointer;color:#94A3B8;font-size:.75rem;padding:2px 4px;margin-left:4px"><i class="fas fa-trash-alt"></i></button>`:''}
        </div>
        <p class="review-text">${escapeHtml(c.text)}</p>
        <div class="review-actions">
          <button class="review-like-btn${isLiked ? ' liked' : ''}" onclick="likeBizComment('${bizId}','${c.id}',this)">
            <i class="fas fa-heart"></i> <span class="review-like-count">${c.likes || 0}</span>
          </button>
        </div>
      </div>`;
    }
  }).join('');

  const totalCount = allReviews.length;

  wrap.innerHTML=`
    <p class="modal-section-title">Reseñas de clientes (${totalCount})</p>
    <div class="reviews-list" id="bizReviewsList">
      ${reviewsHTML}
      ${totalCount===0?'<p style="font-size:.8125rem;color:var(--muted);text-align:center;padding:16px 0">Aún no hay reseñas. ¡Sé el primero!</p>':''}
    </div>
    <div style="margin-top:20px">
      <div style="display:flex;gap:10px;align-items:flex-start">
        <div style="flex-shrink:0;margin-top:2px">${_getUserAvatarHTML(36)}</div>
        <div style="flex:1">
          <div class="biz-review-form-box">
            <div class="biz-review-form-title"><i class="fas fa-star" style="color:var(--primary)"></i> Aportar reseña</div>
            <div class="biz-review-star-row" id="bizStarPicker" data-val="0">
              ${[1,2,3,4,5].map(i=>`<button type="button" class="biz-star-btn" data-star="${i}" onclick="setBizStar(${i})" onmouseenter="hoverBizStar(${i})" onmouseleave="resetBizStarHover()" aria-label="${i} estrellas">
                <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              </button>`).join('')}
              <span class="biz-star-label" id="bizStarLabel">Selecciona tu puntuación</span>
            </div>
            <textarea id="bizCommentInput" placeholder="Escribe tu reseña..." maxlength="400" rows="2"
              class="biz-review-textarea"
              onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='var(--border)'"
            ></textarea>
            <div style="display:flex;justify-content:flex-end;margin-top:8px">
              <button onclick="submitBizComment('${bizId}')" class="biz-review-submit-btn">
                <i class="fas fa-paper-plane"></i> Publicar reseña
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>`;
}

function shareModalBusiness(){
  const b=BUSINESSES.find(x=>x.id===modalBusinessId);
  if(!b) return;

  const shareText=`${b.name}\n📍 ${b.address}\n📞 ${b.phone}`;
  const shareUrl=window.location.href;

  // Intentar Web Share API (funciona en móvil/HTTPS)
  if(navigator.share && location.protocol!=='file:'){
    navigator.share({title:b.name,text:`${b.name} – ${b.address}`,url:shareUrl}).catch(()=>{});
    return;
  }

  // Fallback: mostrar panel de opciones de compartir
  _showSharePanel(b, shareText, shareUrl);
}

function _showSharePanel(b, shareText, shareUrl){
  // Si ya existe, quitarlo
  const existing=document.getElementById('sharePanel');
  if(existing){ existing.remove(); return; }

  const waText=encodeURIComponent(`${b.name}\n📍 ${b.address}\n📞 ${b.phone}`);
  const tgText=encodeURIComponent(`${b.name} – ${b.address}`);

  const panel=document.createElement('div');
  panel.id='sharePanel';
  panel.innerHTML=`
    <div class="share-panel-backdrop" onclick="document.getElementById('sharePanel').remove()"></div>
    <div class="share-panel-box">
      <div class="share-panel-title">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>
        Compartir negocio
      </div>
      <div class="share-panel-name">${b.name}</div>
      <div class="share-panel-btns">
        <button class="share-opt-btn share-opt-wa" onclick="_shareTo('wa','${waText}')">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M11.92 2C6.418 2 2 6.418 2 11.92c0 1.846.487 3.579 1.34 5.083L2 22l5.104-1.333A9.875 9.875 0 0 0 11.92 21.84C17.421 21.84 22 17.421 22 11.92S17.421 2 11.92 2zm0 17.882a7.93 7.93 0 0 1-4.043-1.105l-.29-.173-3.008.787.803-2.933-.19-.302A7.875 7.875 0 0 1 4.04 11.92c0-4.348 3.538-7.882 7.881-7.882 4.344 0 7.882 3.534 7.882 7.882 0 4.349-3.538 7.882-7.882 7.882z"/></svg>
          WhatsApp
        </button>
        <button class="share-opt-btn share-opt-tg" onclick="_shareTo('ig','${tgText}')">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          Instagram
        </button>
        <button class="share-opt-btn share-opt-copy" id="shareCopyBtn" onclick="_shareCopy('${encodeURIComponent(shareText)}')">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
          Copiar
        </button>
      </div>
      <button class="share-panel-close" onclick="document.getElementById('sharePanel').remove()">Cerrar</button>
    </div>
  `;
  document.body.appendChild(panel);
}

function _shareTo(platform, encodedText){
  const urls={
    wa: `https://wa.me/?text=${encodedText}`,
    ig: `https://www.instagram.com/`
  };
  window.open(urls[platform],'_blank','noopener');
  if(platform==='ig') showToast('Copia el texto y compártelo en Instagram 📸');
}

function _shareCopy(encodedText){
  const text=decodeURIComponent(encodedText);
  const btn=document.getElementById('shareCopyBtn');
  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(text).then(()=>{
      if(btn){ btn.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg> ¡Copiado!'; btn.style.color='#10B981'; }
      setTimeout(()=>{ const p=document.getElementById('sharePanel'); if(p) p.remove(); },1200);
    }).catch(()=>_shareCopyFallback(text));
  } else {
    _shareCopyFallback(text);
  }
}

function _shareCopyFallback(text){
  // Método clásico compatible con file://
  const ta=document.createElement('textarea');
  ta.value=text;
  ta.style.cssText='position:fixed;top:-9999px;left:-9999px;opacity:0';
  document.body.appendChild(ta);
  ta.select();
  ta.setSelectionRange(0,99999);
  const ok=document.execCommand('copy');
  document.body.removeChild(ta);
  const btn=document.getElementById('shareCopyBtn');
  if(ok){
    if(btn){ btn.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg> ¡Copiado!'; btn.style.color='#10B981'; }
    setTimeout(()=>{ const p=document.getElementById('sharePanel'); if(p) p.remove(); },1200);
  } else {
    showToast(`📋 ${text.split('\n')[0]}`);
  }
}

function updateModalFavBtn(){const isFav=favorites.has(modalBusinessId);const btn=document.getElementById('modalFavBtn');btn.classList.toggle('active',isFav);document.getElementById('modalFavLabel').textContent=isFav?'Guardado':'Guardar';btn.querySelector('svg').style.fill=isFav?'#EF4444':'none';} 

function toggleModalFav(){toggleFav(modalBusinessId);} 

function closeModal(e){if(e.target===document.getElementById('modalOverlay'))closeModalDirect();} 

function closeModalDirect(){document.getElementById('modalOverlay').classList.add('hide');document.body.style.overflow='';modalBusinessId=null;}

/* ── Reseñas de usuario en negocios ── */
function _getBizComments(bizId){try{return JSON.parse(localStorage.getItem('fynderBizComments_'+bizId)||'[]');}catch(e){return[];}}
function _saveBizComments(bizId,c){localStorage.setItem('fynderBizComments_'+bizId,JSON.stringify(c));}

function submitBizComment(bizId){
  const ta=document.getElementById('bizCommentInput');
  const text=ta?ta.value.trim():'';
  if(!text||text.length<2){showToast('Escribe algo antes de publicar.','error');return;}
  const picker=document.getElementById('bizStarPicker');
  const stars=picker?parseInt(picker.dataset.val||'0'):0;
  if(!stars){showToast('Selecciona una puntuación de 1 a 5 estrellas.','error');return;}
  const logged=!!localStorage.getItem('fynderLogged');
  const user=JSON.parse(localStorage.getItem('fynderUser')||'null');
  const name=logged&&user?user.name:'Visitante';
  const initial=_getInitials(name);
  const userId=logged&&user?(user.email||user.name):null;
  const avatarPhoto=localStorage.getItem('fynderAvatarPhoto')||null;
  const avatarPreset=!avatarPhoto?(localStorage.getItem('fynderAvatarPreset')||null):null;
  const avatarInitBg=(!avatarPhoto&&!avatarPreset)?(localStorage.getItem('fynderAvatarInitialBg')||null):null;
  const colorIdx=Math.floor(Math.random()*ART_COMMENT_COLORS.length);
  const now=new Date();
  const dateStr=now.toLocaleDateString('es-ES',{day:'numeric',month:'short',year:'numeric'});
  const comment={id:Date.now().toString(),name,initial,userId,colorIdx,avatarPhoto,avatarPreset,avatarInitBg,text,stars,date:dateStr};
  const comments=_getBizComments(bizId);
  comments.push(comment);
  _saveBizComments(bizId,comments);
  // Resetear estado de estrellas
  _bizStarVal=0;
  // Re-renderizar usando el bizId almacenado
  const b=BUSINESSES.find(x=>x.id===bizId)||BUSINESSES.find(x=>x.id===modalBusinessId);
  const cat=b?CATEGORIES.find(c=>c.id===b.categoryId):null;
  renderModalReviews(bizId,cat);
  showToast('¡Reseña publicada! ⭐');
}

/* ── Like en reseñas de negocios ── */
function likeBizComment(bizId, commentId, btn) {
  const likedKey = 'fynderBizRevLikes_' + bizId;
  const liked = JSON.parse(localStorage.getItem(likedKey) || '[]');
  const comments = _getBizComments(bizId);
  const idx = comments.findIndex(c => c.id === commentId);
  if(idx === -1) return;

  if(liked.includes(commentId)) {
    // quitar like
    comments[idx].likes = Math.max(0, (comments[idx].likes || 0) - 1);
    liked.splice(liked.indexOf(commentId), 1);
    if(btn) btn.classList.remove('liked');
  } else {
    // dar like
    comments[idx].likes = (comments[idx].likes || 0) + 1;
    liked.push(commentId);
    if(btn) {
      btn.classList.add('liked');
      btn.classList.add('like-pop');
      setTimeout(() => btn && btn.classList.remove('like-pop'), 350);
    }
  }
  localStorage.setItem(likedKey, JSON.stringify(liked));
  _saveBizComments(bizId, comments);
  // Actualizar solo el contador sin re-renderizar todo
  if(btn) {
    const countEl = btn.querySelector('.review-like-count');
    if(countEl) countEl.textContent = comments[idx].likes;
  }
  // Re-renderizar para reordenar por likes
  const b = BUSINESSES.find(x => String(x.id) === String(bizId));
  const cat = b ? CATEGORIES.find(c => c.id === b.categoryId) : null;
  renderModalReviews(bizId, cat);
}

/* ── Star picker para reseñas ── */
let _bizStarVal = 0;
const _starLabels = ['','Muy malo','Regular','Bueno','Muy bueno','Excelente'];

function _updateBizStars(hovered, selected) {
  const btns = document.querySelectorAll('#bizStarPicker .biz-star-btn');
  const active = hovered || selected || 0;
  btns.forEach((btn, i) => {
    const filled = i < active;
    btn.classList.toggle('filled', filled);
  });
  const label = document.getElementById('bizStarLabel');
  if (label) label.textContent = hovered ? _starLabels[hovered] : (selected ? _starLabels[selected] : 'Selecciona tu puntuación');
}

function setBizStar(val) {
  _bizStarVal = val;
  const picker = document.getElementById('bizStarPicker');
  if (picker) picker.dataset.val = val;
  _updateBizStars(0, val);
}

function hoverBizStar(val) { _updateBizStars(val, _bizStarVal); }
function resetBizStarHover() { _updateBizStars(0, _bizStarVal); }

function deleteBizComment(bizId,commentId){  _saveBizComments(bizId,_getBizComments(bizId).filter(c=>c.id!==commentId));
  const b=BUSINESSES.find(x=>x.id===bizId)||BUSINESSES.find(x=>x.id===modalBusinessId);
  const cat=b?CATEGORIES.find(c=>c.id===b.categoryId):null;
  renderModalReviews(bizId,cat);
  showToast('Reseña eliminada.');
}

/* ── Drag-to-scroll en cat-filters (desktop mouse + touch mobile) ── */
function initCatFiltersDrag(){
  const el=document.getElementById('dirCatFilters');
  if(!el) return;
  let isDown=false, startX=0, scrollLeft=0;
  el.addEventListener('mousedown',e=>{
    isDown=true; el.classList.add('dragging');
    startX=e.pageX-el.offsetLeft; scrollLeft=el.scrollLeft;
  });
  el.addEventListener('mouseleave',()=>{ isDown=false; el.classList.remove('dragging'); });
  el.addEventListener('mouseup',()=>{ isDown=false; el.classList.remove('dragging'); });
  el.addEventListener('mousemove',e=>{
    if(!isDown) return;
    e.preventDefault();
    const x=e.pageX-el.offsetLeft;
    el.scrollLeft=scrollLeft-(x-startX)*1.2;
  });
}

function buildCategories(){
  document.getElementById('catGrid').innerHTML=CATEGORIES.map(c=>{
    const count=BUSINESSES.filter(b=>b.categoryId===c.id).length;
    return`<button class="cat-card" onclick="goDirectoryQuery('','${c.id}')"><div class="cat-icon" style="background:${c.bg};color:${c.color}">${c.svg}</div><div class="cat-name">${c.label}</div><div class="cat-count">${count} negocio${count!==1?'s':''}</div></button>`;
  }).join('');
} 

function buildHome(){
  document.getElementById('featuredGrid').innerHTML=BUSINESSES.filter(b=>b.isFeatured).slice(0,3).map(gridCardHTML).join('');
  document.getElementById('popularList').innerHTML=BUSINESSES.filter(b=>b.isPopular).slice(0,4).map(listCardHTML).join('');

  // ── Cifras reales calculadas desde BUSINESSES y REVIEWS ──
  const total = BUSINESSES.length;
  const totalReviews = Object.values(REVIEWS).reduce((s,arr)=>s+arr.length,0);
  const totalReviewCount = BUSINESSES.reduce((s,b)=>s+(b.reviews||0),0);
  const allRatings = BUSINESSES.map(b=>b.rating).filter(Boolean);
  const avgRating = allRatings.length ? (allRatings.reduce((a,b)=>a+b,0)/allRatings.length).toFixed(1) : '4.8';
  const highSat = BUSINESSES.filter(b=>b.rating>=4.0).length;
  const satPct = Math.round((highSat/total)*100);
  const usersEst = USERS_EST;

  const heroStat=document.getElementById('heroStatNegocios');
  if(heroStat) heroStat.textContent=total;
  const heroStatUsers=document.getElementById('heroStatUsuarios');
  if(heroStatUsers) heroStatUsers.textContent=usersEst.toLocaleString('es')+'+';
  const heroStatRating=document.getElementById('heroStatRating');
  if(heroStatRating) heroStatRating.textContent=avgRating;
  const heroStatSat=document.getElementById('heroStatSatisfaccion');
  if(heroStatSat) heroStatSat.textContent=satPct+'%';

  // Sincronizar versión móvil de stats
  const m1=document.getElementById('heroStatNegociosMobile');   if(m1) m1.textContent=total;
  const m2=document.getElementById('heroStatUsuariosMobile');   if(m2) m2.textContent=usersEst.toLocaleString('es')+'+';
  const m3=document.getElementById('heroStatRatingMobile');     if(m3) m3.textContent=avgRating;
  const m4=document.getElementById('heroStatSatisfaccionMobile');if(m4) m4.textContent=satPct+'%';
  const loginCount=document.getElementById('loginNegociosCount');
  if(loginCount) loginCount.textContent=`+${total} negocios registrados`;
}

// calculo de usuarios
const USERS_EST = Math.max(1200, BUSINESSES.length * 14);
function openStatModal(type){
  const total=BUSINESSES.length;
  const allRatings=BUSINESSES.map(b=>b.rating).filter(Boolean);
  const avgRating=(allRatings.reduce((a,b)=>a+b,0)/allRatings.length).toFixed(1);
  const highSat=BUSINESSES.filter(b=>b.rating>=4.0).length;
  const satPct=Math.round((highSat/total)*100);
  const usersEst=USERS_EST;
  const byCat=CATEGORIES.map(c=>({
    label:c.label,color:c.color,bg:c.bg,
    count:BUSINESSES.filter(b=>b.categoryId===c.id).length
  })).filter(x=>x.count>0).sort((a,b)=>b.count-a.count);
  const maxCount=Math.max(...byCat.map(x=>x.count));

  const configs={
    negocios:{
      icon:'🏪',title:'Negocios Registrados',value:total,unit:'negocios',
      desc:'Total de negocios activos en la plataforma FYNDER.',
      color:'#67B8B4',
      extra:`<div class="smodal-extra-row"><span>Nuevos este mes</span><strong style="color:#67B8B4">+${BUSINESSES.filter(b=>b.isNew).length}</strong></div>
             <div class="smodal-extra-row"><span>Destacados</span><strong style="color:#F4D35E">⭐ ${BUSINESSES.filter(b=>b.isFeatured).length}</strong></div>
             <div class="smodal-extra-row"><span>Populares</span><strong style="color:#EF4444">🔥 ${BUSINESSES.filter(b=>b.isPopular).length}</strong></div>`,
      chartTitle:'Negocios por categoría',chart:byCat,chartType:'bar'
    },
    usuarios:{
      icon:'👥',title:'Usuarios Activos',value:usersEst.toLocaleString('es')+'+',unit:'usuarios',
      desc:'Personas que usan FYNDER para descubrir negocios locales.',
      color:'#2F5BB7',
      extra:`<div class="smodal-extra-row"><span>Usuarios nuevos/mes</span><strong style="color:#2F5BB7">+${Math.round(usersEst*0.08).toLocaleString('es')}</strong></div>
             <div class="smodal-extra-row"><span>Retención</span><strong style="color:#10B981">92%</strong></div>
             <div class="smodal-extra-row"><span>Negocios / usuario</span><strong style="color:#8B5CF6">~${(total/usersEst*1000).toFixed(1)} ‰</strong></div>`,
      chartTitle:'Actividad mensual (últimos 6 meses)',chart:[
        {label:'Ene',count:Math.round(usersEst*.55),color:'#2F5BB7',bg:'#EEF2FF'},
        {label:'Feb',count:Math.round(usersEst*.62),color:'#2F5BB7',bg:'#EEF2FF'},
        {label:'Mar',count:Math.round(usersEst*.70),color:'#2F5BB7',bg:'#EEF2FF'},
        {label:'Abr',count:Math.round(usersEst*.78),color:'#2F5BB7',bg:'#EEF2FF'},
        {label:'May',count:Math.round(usersEst*.88),color:'#2F5BB7',bg:'#EEF2FF'},
        {label:'Jun',count:usersEst,color:'#2F5BB7',bg:'#EEF2FF'},
      ],chartType:'bar'
    },
    rating:{
      icon:'⭐',title:'Valoración Promedio',value:avgRating,unit:'/ 5 estrellas',
      desc:'Promedio calculado de todos los negocios activos en la plataforma.',
      color:'#F4D35E',
      extra:`<div class="smodal-extra-row"><span>Rating 5.0 ⭐</span><strong style="color:#F4D35E">${BUSINESSES.filter(b=>b.rating>=4.9).length} negocios</strong></div>
             <div class="smodal-extra-row"><span>Rating 4.5–4.9</span><strong style="color:#F97316">${BUSINESSES.filter(b=>b.rating>=4.5&&b.rating<4.9).length} negocios</strong></div>
             <div class="smodal-extra-row"><span>Rating 4.0–4.4</span><strong style="color:#10B981">${BUSINESSES.filter(b=>b.rating>=4.0&&b.rating<4.5).length} negocios</strong></div>`,
      chartTitle:'Distribución de ratings',chart:[
        {label:'5.0 ⭐',count:BUSINESSES.filter(b=>b.rating>=4.9).length,color:'#F4D35E',bg:'#FFFBEB'},
        {label:'4.5–4.8',count:BUSINESSES.filter(b=>b.rating>=4.5&&b.rating<4.9).length,color:'#F97316',bg:'#FFF7ED'},
        {label:'4.0–4.4',count:BUSINESSES.filter(b=>b.rating>=4.0&&b.rating<4.5).length,color:'#10B981',bg:'#ECFDF5'},
        {label:'<4.0',count:BUSINESSES.filter(b=>b.rating<4.0).length,color:'#6B7280',bg:'#F3F4F6'},
      ],chartType:'bar'
    },
    satisfaccion:{
      icon:'📈',title:'Índice de Satisfacción',value:satPct+'%',unit:'de negocios ≥ 4.0★',
      desc:'Porcentaje de negocios con calificación de 4.0 o más sobre 5 estrellas.',
      color:'#10B981',
      extra:`<div class="smodal-extra-row"><span>Negocios satisfactorios</span><strong style="color:#10B981">${highSat} de ${total}</strong></div>
             <div class="smodal-extra-row"><span>Reseñas registradas</span><strong style="color:#8B5CF6">${Object.keys(REVIEWS).length * 3}+</strong></div>
             <div class="smodal-extra-row"><span>NPS estimado</span><strong style="color:#2F5BB7">+78</strong></div>`,
      chartTitle:'Satisfacción por categoría',chart:CATEGORIES.map(c=>{
        const bs=BUSINESSES.filter(b=>b.categoryId===c.id);
        if(!bs.length)return null;
        const avg=(bs.reduce((s,b)=>s+(b.rating||0),0)/bs.length);
        return{label:c.label,count:Math.round(avg*10)/10,color:c.color,bg:c.bg,isRating:true};
      }).filter(Boolean).sort((a,b)=>b.count-a.count),chartType:'bar'
    }
  };
  const cfg=configs[type];
  if(!cfg)return;
  const chartMax=Math.max(...cfg.chart.map(x=>x.count));
  const barsHTML=cfg.chart.map(x=>{
    const pct=chartMax>0?Math.round((x.count/chartMax)*100):0;
    const label=x.isRating?x.count.toFixed(1)+'★':x.count.toLocaleString('es');
    return`<div class="smodal-bar-row">
      <div class="smodal-bar-label">${x.label}</div>
      <div class="smodal-bar-track">
        <div class="smodal-bar-fill" style="width:${pct}%;background:${x.color}" data-pct="${pct}"></div>
      </div>
      <div class="smodal-bar-val" style="color:${x.color}">${label}</div>
    </div>`;
  }).join('');
  document.getElementById('statModalOverlay').innerHTML=`
    <div class="smodal-box" onclick="event.stopPropagation()">
      <button class="smodal-close" onclick="closeStatModal()">✕</button>
      <div class="smodal-header" style="--scolor:${cfg.color}">
        <div class="smodal-icon-big">${cfg.icon}</div>
        <div>
          <div class="smodal-main-val" style="color:${cfg.color}">${cfg.value}</div>
          <div class="smodal-main-unit">${cfg.unit}</div>
        </div>
      </div>
      <h3 class="smodal-title">${cfg.title}</h3>
      <p class="smodal-desc">${cfg.desc}</p>
      <div class="smodal-extras">${cfg.extra}</div>
      <div class="smodal-chart-section">
        <div class="smodal-chart-title">${cfg.chartTitle}</div>
        <div class="smodal-bars">${barsHTML}</div>
      </div>
    </div>`;
  const ov=document.getElementById('statModalOverlay');
  ov.classList.remove('hide');
  document.body.style.overflow='hidden';
  // Animar barras con delay
  requestAnimationFrame(()=>{
    ov.querySelectorAll('.smodal-bar-fill').forEach((el,i)=>{
      const w=el.dataset.pct+'%';
      el.style.width='0%';
      setTimeout(()=>{ el.style.width=w; },80+i*60);
    });
  });
}

function closeStatModal(){
  document.getElementById('statModalOverlay').classList.add('hide');
  document.body.style.overflow='';
} 

function buildDirCatFilters(){const dealsActive=dirActiveCategory==='__deals__';document.getElementById('dirCatFilters').innerHTML=`<button class="filter-chip ${!dirActiveCategory?'active':''}" onclick="setDirCat('')">Todos</button><button class="filter-chip filter-chip-deals ${dealsActive?'active':''}" onclick="setDirCat('__deals__')"><i class="fas fa-tags"></i> Ofertas</button>`+CATEGORIES.map(c=>`<button class="filter-chip ${dirActiveCategory===c.id?'active':''}" onclick="setDirCat('${c.id}')" style="${dirActiveCategory===c.id?'background:'+c.color+';color:#fff;':''}">${c.label}</button>`).join('');initCatFiltersDrag();} 

function setDirCat(id){dirActiveCategory=id;buildDirCatFilters();renderDirectory();} 

function setView(v){dirViewMode=v;document.getElementById('viewGrid').classList.toggle('active',v==='grid');document.getElementById('viewList').classList.toggle('active',v==='list');renderDirectory();} 

function filterDir(){const v=document.getElementById('dirSearch').value;document.getElementById('dirClear').classList.toggle('hide',!v);renderDirectory();} 

function clearDirSearch(){document.getElementById('dirSearch').value='';document.getElementById('dirClear').classList.add('hide');renderDirectory();} 

function renderDirectory(){buildDirCatFilters();const q=document.getElementById('dirSearch').value.toLowerCase().trim();const isDeals=dirActiveCategory==='__deals__';const res=BUSINESSES.filter(b=>{const mc=isDeals?!!b.deal:(!dirActiveCategory||b.categoryId===dirActiveCategory);const mq=!q||b.name.toLowerCase().includes(q)||b.category.toLowerCase().includes(q)||b.tags.some(t=>t.toLowerCase().includes(q))||b.description.toLowerCase().includes(q);return mc&&mq;});const cl=isDeals?'Ofertas':dirActiveCategory?CATEGORIES.find(c=>c.id===dirActiveCategory)?.label:'';document.getElementById('dirCount').innerHTML=`<strong>${res.length}</strong> negocio${res.length!==1?'s':''} encontrado${res.length!==1?'s':''}${cl?` en <span class="highlight">${cl}</span>`:''}`;const el=document.getElementById('dirResults');if(res.length===0){el.innerHTML=`<div class="empty-state"><div class="empty-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg></div><div class="empty-title">Sin resultados</div><div class="empty-desc">Intenta con otra búsqueda o categoría.</div></div>`;return;}el.innerHTML=dirViewMode==='grid'?`<div class="cards-grid">${res.map(gridCardHTML).join('')}</div>`:`<div class="cards-list">${res.map(listCardHTML).join('')}</div>`;} 

function renderFavorites(){const favs=BUSINESSES.filter(b=>favorites.has(b.id));document.getElementById('favsCount').textContent=`${favs.length} negocio${favs.length!==1?'s':''} guardado${favs.length!==1?'s':''}`;const el=document.getElementById('favsResults');el.innerHTML=favs.length===0?`<div class="empty-state"><div class="fav-empty-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg></div><div class="empty-title">Tu lista está vacía</div><div class="empty-desc" style="max-width:360px">Guarda tus negocios favoritos tocando el ícono del corazón.</div></div>`:`<div class="cards-grid">${favs.map(gridCardHTML).join('')}</div>`;} 

buildCategories();buildHome();updateNav();
// drag scroll en filtros
// tambien se llama desde goPage
document.addEventListener('DOMContentLoaded', ()=>{ setTimeout(initCatFiltersDrag, 200); });

function registerUser(event){
    event.preventDefault();

    const name  = document.getElementById("regName").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const phone = document.getElementById("regPhone").value.trim();
    const pass  = document.getElementById("regPass").value;
    const pass2 = document.getElementById("regPass2").value;
    const passError = document.getElementById("passError");

    // Validar que las contraseñas coincidan
    if(pass !== pass2){
        passError.classList.remove("hide");
        document.getElementById("regPass2").focus();
        return;
    }
    passError.classList.add("hide");

    const user = { name, email, phone, pass };
    localStorage.setItem("fynderUser", JSON.stringify(user));

    // Mostrar nombre en la navbar y marcar como logueado
    localStorage.setItem("fynderLogged", "true");
    localStorage.setItem("fynderUserStatus", "active");
    document.getElementById("userName").textContent = "Hola, " + name;
    _saveCurrentAccount();  // guardar en la lista de cuentas
    localStorage.removeItem('fynderAddingAccount');
    updateNav();
    showToast("¡Cuenta creada! Bienvenido a FYNDER, " + name + " 🎉");
    goPage("home");
}

function loginUser(event){
    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const pass  = document.getElementById("loginPass").value;
    const user  = JSON.parse(localStorage.getItem("fynderUser"));

    if(!user){
        showToast("No existe ninguna cuenta registrada. Crea una primero.", "error");
        return;
    }

    if(email === user.email && pass === user.pass){
        localStorage.setItem("fynderLogged", "true");
        // Auto-estado: Activo al iniciar sesión
        localStorage.setItem("fynderUserStatus", "active");
        document.getElementById("userName").textContent = "Hola, " + user.name;
        _saveCurrentAccount();  // guardar/actualizar en la lista de cuentas
        localStorage.removeItem('fynderAddingAccount');
        updateNav();
        showToast("¡Bienvenido de nuevo, " + user.name + "!");
        goPage("home");
    }else{
        showToast("Correo o contraseña incorrectos.", "error");
    }
}

function forgotPassword(){
    const email = prompt("Ingresa tu correo electrónico para recuperar tu contraseña:");
    if(!email) return;

    const user = JSON.parse(localStorage.getItem("fynderUser"));

    if(!user){
        showToast("No existe ninguna cuenta registrada.", "error");
        return;
    }

    if(email.trim() === user.email){
        showToast("Tu contraseña es: " + user.pass);
    }else{
        showToast("No se encontró ninguna cuenta con ese correo.", "error");
    }
}

function logout(){
    // Auto-estado: Desactivado al cerrar sesión
    localStorage.setItem("fynderUserStatus", "offline");
    localStorage.removeItem("fynderLogged");
    document.getElementById("userName").textContent = "";
    updateNav();
    showToast("Sesión cerrada correctamente.");
    goPage("home");
}

function loadProfile(){
    const user = JSON.parse(localStorage.getItem("fynderUser"));
    if(!user){
        showToast("Debes iniciar sesión para ver tu perfil.", "error");
        goPage("login");
        return;
    }

    // Cabecera: nombre y email
    const pname  = document.getElementById("profileName");
    const pemail = document.getElementById("profileEmail");
    if(pname)  pname.textContent  = user.name;
    if(pemail) pemail.textContent = user.email;

    // Avatar y portada
    applyAvatarDisplay();
    applyProfileCover();

    // Ciudad badge
    const cityBadge = document.getElementById("profileCityBadge");
    const cityLabel = document.getElementById("profileCityLabel");
    if(cityBadge && cityLabel && user.city){
        cityLabel.textContent = user.city;
        cityBadge.style.display = 'inline-flex';
    } else if(cityBadge){
        cityBadge.style.display = 'none';
    }

    // Estado
    const savedStatus = localStorage.getItem("fynderUserStatus") || "active";
    applyStatusUI(savedStatus);

    // Campos del formulario
    const eName  = document.getElementById("profileEditName");
    const eEmail = document.getElementById("profileEditEmail");
    const ePhone = document.getElementById("profileEditPhone");
    const eCity  = document.getElementById("profileEditCity");
    const eBio   = document.getElementById("profileEditBio");
    if(eName)  eName.value  = user.name  || '';
    if(eEmail) eEmail.value = user.email || '';
    if(ePhone) ePhone.value = user.phone || '';
    if(eCity)  eCity.value  = user.city  || '';
    if(eBio){
        eBio.value = user.bio || '';
        updateBioCount();
        // Evitar duplicar el listener
        eBio.oninput = updateBioCount;
    }

    // Estadísticas
    const sf = document.getElementById("statFavs");
    const sb = document.getElementById("statBiz");
    if(sf) sf.textContent = favorites.size;
    if(sb) sb.textContent = JSON.parse(localStorage.getItem("fynderBusinesses")||"[]").length;

    hideAvatarOptions();
}

/* ── Avatar ── */
/* ── Avatar ── */
function applyAvatarDisplay(){
    const avt = document.getElementById("profileAvatar");
    if(!avt) return;
    const stored = localStorage.getItem("fynderAvatarPhoto");
    const preset = localStorage.getItem("fynderAvatarPreset");   // emoji preset
    const initBg = localStorage.getItem("fynderAvatarInitialBg"); // color inicial
    const user   = JSON.parse(localStorage.getItem("fynderUser"));

    if(stored){
        // Foto subida o tomada con cámara
        avt.innerHTML = `<img src="${stored}" alt="Foto de perfil" style="width:100%;height:100%;object-fit:cover;border-radius:50%;display:block">`;
        avt.style.background = '';
    } else if(preset){
        // Avatar emoji predeterminado
        avt.innerHTML = `<span style="font-size:1.9rem;line-height:1;pointer-events:none;user-select:none">${preset}</span>`;
        avt.style.background = '#F0FEFE';
    } else {
        // Iniciales del usuario con color elegido (o degradado por defecto)
        const initials = user?.name ? _getInitials(user.name) : '?';
        const bg = initBg || 'linear-gradient(135deg,#67B8B4,#2F5BB7)';
        avt.style.background = bg;
        const fs = initials.length > 1 ? '1.3rem' : '1.6rem';
        avt.innerHTML = `<span style="font-size:${fs};font-weight:800;color:#fff;pointer-events:none;user-select:none;font-family:'Poppins',sans-serif;letter-spacing:1px">${initials}</span>`;
    }
}

/* ── Portada: usa background-image para no tocar el DOM del div ── */
function applyProfileCover(){
    const cover = document.getElementById("profileCover");
    if(!cover) return;
    const photo  = localStorage.getItem("fynderCoverPhoto");
    const icon   = cover.querySelector('.profile-cover-default-icon');
    const delBtn = document.getElementById('coverDelBtn');
    if(photo){
        cover.style.backgroundImage    = `url(${photo})`;
        cover.style.backgroundSize     = 'cover';
        cover.style.backgroundPosition = 'center';
        if(icon)   icon.style.visibility = 'hidden';
        if(delBtn) delBtn.style.display  = 'inline-flex';
    } else {
        cover.style.backgroundImage = '';
        if(icon)   icon.style.visibility = '';
        if(delBtn) delBtn.style.display  = 'none';
    }
}

function onCoverFileSelected(event){
    const file = event.target.files && event.target.files[0];
    if(!file) return;
    if(!file.type.startsWith('image/')){
        showToast('Selecciona un archivo de imagen.', 'error'); return;
    }
    if(file.size > 8 * 1024 * 1024){
        showToast('La imagen supera 8 MB.', 'error'); return;
    }
    const reader = new FileReader();
    reader.onload = function(e){
        localStorage.setItem('fynderCoverPhoto', e.target.result);
        applyProfileCover();
        showToast('¡Foto de portada actualizada! 🖼️');
    };
    reader.readAsDataURL(file);
    event.target.value = '';
}

function removeCover(){
    localStorage.removeItem("fynderCoverPhoto");
    applyProfileCover();
    showToast("Foto de portada eliminada.");
}

/* ── Disparadores de file input — se recrean cada vez para garantizar el disparo del evento ── */
function _openFilePicker(accept, callback){
    // Eliminar cualquier input previo
    const old = document.getElementById('_dynFileInput');
    if(old) old.remove();

    const inp = document.createElement('input');
    inp.type = 'file';
    inp.id   = '_dynFileInput';
    inp.accept = accept;
    inp.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0;width:1px;height:1px';
    inp.addEventListener('change', function(){
        if(this.files && this.files[0]) callback(this.files[0]);
        this.remove();
    });
    document.body.appendChild(inp);
    // Pequeño timeout para que el DOM lo registre antes del click
    setTimeout(() => inp.click(), 10);
}

function triggerAvatarPicker(){
    hideAvatarOptions();
    _openFilePicker('image/*', (file) => _saveImageToStorage(file, 'avatar'));
}

function triggerCameraCapture(){
    hideAvatarOptions();
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
        cameraOpen('avatar');
    } else {
        _openFilePicker('image/*', (file) => _saveImageToStorage(file, 'avatar'));
        showToast('Cámara no disponible. Selecciona una imagen guardada.');
    }
}

function triggerCoverPicker(){
    _openFilePicker('image/*', (file) => _saveImageToStorage(file, 'cover'));
}

function _saveImageToStorage(file, target){
    if(!file.type.startsWith('image/')){
        showToast('Selecciona un archivo de imagen válido.', 'error'); return;
    }
    const maxMB = target === 'cover' ? 8 : 5;
    if(file.size > maxMB * 1024 * 1024){
        showToast(`La imagen supera ${maxMB} MB. Elige una más pequeña.`, 'error'); return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
        const dataUrl = e.target.result;
        if(target === 'cover'){
            localStorage.setItem('fynderCoverPhoto', dataUrl);
            applyProfileCover();
            showToast('¡Foto de portada actualizada! 🖼️');
        } else {
            // Al subir foto real, limpiar preset e inicial
            localStorage.removeItem('fynderAvatarPreset');
            localStorage.removeItem('fynderAvatarInitialBg');
            localStorage.setItem('fynderAvatarPhoto', dataUrl);
            applyAvatarDisplay();
            _saveCurrentAccount();  // sincronizar foto en la lista de cuentas
            showToast('¡Foto de perfil actualizada! 📸');
        }
    };
    reader.readAsDataURL(file);
}

// handlers de cambio de archivo
function handleAvatarChange(input){
    const file = input.files && input.files[0];
    if(file) _saveImageToStorage(file, 'avatar');
    input.value = '';   // reset para poder subir el mismo archivo de nuevo
}

function handleCoverChange(input){
    const file = input.files && input.files[0];
    if(file) _saveImageToStorage(file, 'cover');
    input.value = '';
}

/* ── Cámara con getUserMedia ── */
let _cameraStream = null;
let _cameraTarget = 'avatar'; // 'avatar' | 'cover'

function cameraOpen(target){
    _cameraTarget = target || 'avatar';
    const modal = document.getElementById('cameraModal');
    const video = document.getElementById('cameraVideo');
    if(!modal || !video) return;

    navigator.mediaDevices.getUserMedia({ video: { width:640, height:480, facingMode:'user' }, audio:false })
        .then(stream => {
            _cameraStream = stream;
            video.srcObject = stream;
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        })
        .catch(err => {
            console.warn('Camera error:', err);
            // Fallback a input file si la cámara falla
            _openFilePicker('image/*', (file) => _saveImageToStorage(file, _cameraTarget));
            showToast('No se pudo acceder a la cámara. Selecciona una foto guardada.', 'error');
        });
}

function cameraSnap(){
    const video  = document.getElementById('cameraVideo');
    const canvas = document.getElementById('cameraCanvas');
    if(!video || !canvas) return;

    canvas.width  = video.videoWidth  || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    // Espejo horizontal (selfie natural)
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.88);
    cameraClose();

    if(_cameraTarget === 'cover'){
        localStorage.setItem('fynderCoverPhoto', dataUrl);
        applyProfileCover();
        showToast('¡Foto de portada tomada! 🖼️');
    } else {
        localStorage.removeItem('fynderAvatarPreset');
        localStorage.removeItem('fynderAvatarInitialBg');
        localStorage.setItem('fynderAvatarPhoto', dataUrl);
        applyAvatarDisplay();
        _saveCurrentAccount();  // sincronizar foto en la lista de cuentas
        showToast('¡Foto de perfil tomada! 📸');
    }
}

function cameraClose(){
    const modal = document.getElementById('cameraModal');
    if(modal) modal.style.display = 'none';
    document.body.style.overflow = '';
    if(_cameraStream){
        _cameraStream.getTracks().forEach(t => t.stop());
        _cameraStream = null;
    }
}

/* ── Panel de opciones de avatar ── */

// colores del avatar
const INITIAL_COLORS = [
    'linear-gradient(135deg,#67B8B4,#2F5BB7)',
    'linear-gradient(135deg,#EF4444,#EC4899)',
    'linear-gradient(135deg,#F59E0B,#EF4444)',
    'linear-gradient(135deg,#10B981,#0EA5E9)',
    'linear-gradient(135deg,#8B5CF6,#EC4899)',
    'linear-gradient(135deg,#0EA5E9,#2F5BB7)',
    'linear-gradient(135deg,#F97316,#FBBF24)',
    'linear-gradient(135deg,#6366F1,#8B5CF6)',
];

// emojis predeterminados
const AVATAR_PRESETS = [
    '🦊','🐺','🦁','🐯','🐻','🐼',
    '🐨','🐸','🦋','🐙','🦄','🐲',
    '🤖','👾','👻','🎃','🐦‍⬛','🐋',
    '🎯','🚀','⚡','🌟','🔥','💎',
    '💀','🐱','🦝','🐞','🦈','🐌',
    '🐝','🐍','🦖','🐢','🦑','🐬',
    '🐦‍🔥','🦥','🦇','🐹','🐭','🐰',
    '🦭','🐶','🐙','🦕','🦉','👽',
];

function showAvatarOptions(){
    const panel = document.getElementById("avatarOptionsPanel");
    if(!panel) return;
    const isHidden = panel.classList.contains("hide");
    if(isHidden){
        _buildInitialsGrid();
        _buildPresetsGrid();
        panel.classList.remove("hide");
    } else {
        panel.classList.add("hide");
    }
}

function hideAvatarOptions(){
    const panel = document.getElementById("avatarOptionsPanel");
    if(panel) panel.classList.add("hide");
}

function _buildInitialsGrid(){
    const container = document.getElementById("avatarInitialsGrid");
    if(!container) return;
    const user     = JSON.parse(localStorage.getItem("fynderUser"));
    const initials = user?.name ? _getInitials(user.name) : '?';
    const current  = localStorage.getItem("fynderAvatarInitialBg");

    container.innerHTML = INITIAL_COLORS.map((bg, i) => {
        const sel = (!localStorage.getItem("fynderAvatarPhoto") && !localStorage.getItem("fynderAvatarPreset") && bg === (current || INITIAL_COLORS[0])) ? 'selected' : '';
        return `<button class="avatar-initial-chip ${sel}" style="background:${bg}" onclick="setAvatarInitial('${bg}')" title="Iniciales ${initials}">${initials}</button>`;
    }).join('');
}

function _buildPresetsGrid(){
    const container = document.getElementById("avatarPresetsGrid");
    if(!container) return;
    const current = localStorage.getItem("fynderAvatarPreset");

    container.innerHTML = AVATAR_PRESETS.map(emoji => {
        const sel = emoji === current ? 'selected' : '';
        return `<button class="avatar-preset-item ${sel}" onclick="setAvatarPreset('${emoji}')" title="${emoji}">${emoji}</button>`;
    }).join('');
}

function setAvatarInitial(bg){
    localStorage.removeItem("fynderAvatarPhoto");
    localStorage.removeItem("fynderAvatarPreset");
    localStorage.setItem("fynderAvatarInitialBg", bg);
    applyAvatarDisplay();
    hideAvatarOptions();
    showToast("¡Avatar de inicial actualizado! ✨");
}

function setAvatarPreset(emoji){
    localStorage.removeItem("fynderAvatarPhoto");
    localStorage.removeItem("fynderAvatarInitialBg");
    localStorage.setItem("fynderAvatarPreset", emoji);
    applyAvatarDisplay();
    hideAvatarOptions();
    showToast(`¡Avatar ${emoji} seleccionado!`);
}

function removeAvatar(){
    localStorage.removeItem("fynderAvatarPhoto");
    localStorage.removeItem("fynderAvatarPreset");
    localStorage.removeItem("fynderAvatarInitialBg");
    applyAvatarDisplay();
    hideAvatarOptions();
    showToast("Foto de perfil eliminada.");
}

/* ── Estado del usuario ── */
const STATUS_CONFIG = {
    active:    { label:'Activo',        color:'#22C55E', bg:'#DCFCE7', textColor:'#16A34A', dot:'●' },
    away:      { label:'Ausente',       color:'#F59E0B', bg:'#FEF3C7', textColor:'#D97706', dot:'●' },
    busy:      { label:'Ocupado',       color:'#EF4444', bg:'#FEF2F2', textColor:'#DC2626', dot:'●' },
    dnd:       { label:'No molestar',   color:'#6B7280', bg:'#F3F4F6', textColor:'#4B5563', dot:'⊘' },
    invisible: { label:'Invisible',     color:'#9CA3AF', bg:'#F9FAFB', textColor:'#6B7280', dot:'○' },
    offline:   { label:'Desactivado',   color:'#374151', bg:'#F3F4F6', textColor:'#374151', dot:'●' },
};

function toggleStatusDropdown(){
    const dd = document.getElementById('statusDropdown');
    if(!dd) return;
    dd.classList.toggle('hide');
    // Cerrar al hacer click fuera
    if(!dd.classList.contains('hide')){
        setTimeout(() => {
            document.addEventListener('click', _closeStatusDropdown, { once: true });
        }, 10);
    }
}

function _closeStatusDropdown(e){
    const wrap = document.getElementById('statusBadgeWrap');
    if(wrap && wrap.contains(e.target)) return;
    const dd = document.getElementById('statusDropdown');
    if(dd) dd.classList.add('hide');
}

function setUserStatus(status){
    localStorage.setItem('fynderUserStatus', status);
    applyStatusUI(status);
    // Cerrar dropdown
    const dd = document.getElementById('statusDropdown');
    if(dd) dd.classList.add('hide');
    showToast(`Estado: ${STATUS_CONFIG[status]?.label || status}`);
}

function applyStatusUI(status){
    const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.active;

    // Badge en la cabecera
    const dot   = document.getElementById('statusDotBadge');
    const label = document.getElementById('profileStatusLabel');
    const badge = document.getElementById('profileStatusBadge');
    if(dot)   dot.style.color   = cfg.color;
    if(label) label.textContent = cfg.label;
    if(badge){
        badge.style.background = cfg.bg        || '#DCFCE7';
        badge.style.color      = cfg.textColor || '#16A34A';
    }

    // Dot en el título de la tarjeta
    const titleDot = document.getElementById('statusDotTitle');
    if(titleDot) titleDot.style.color = cfg.color;

    // Marcar la opción activa en la tarjeta de estado
    document.querySelectorAll('.status-option').forEach(btn => {
        btn.classList.toggle('status-option-active', btn.dataset.status === status);
    });

    // Marcar el item activo en el dropdown del badge
    document.querySelectorAll('.status-dropdown-item').forEach(btn => {
        const s = btn.getAttribute('onclick')?.match(/'(\w+)'/)?.[1];
        btn.style.fontWeight = s === status ? '700' : '';
        btn.style.background = s === status ? cfg.bg : '';
        btn.style.color      = s === status ? cfg.textColor : '';
    });
}

function updateBioCount(){
    const bio = document.getElementById("profileEditBio");
    const counter = document.getElementById("bioCount");
    if(bio && counter) counter.textContent = bio.value.length;
}

function saveProfile(event){
    event.preventDefault();
    const user = JSON.parse(localStorage.getItem("fynderUser"));
    if(!user) return;
    user.name  = document.getElementById("profileEditName").value.trim()  || user.name;
    user.email = document.getElementById("profileEditEmail").value.trim() || user.email;
    user.phone = document.getElementById("profileEditPhone").value.trim();
    user.city  = document.getElementById("profileEditCity")?.value.trim() || '';
    user.bio   = document.getElementById("profileEditBio")?.value.trim()  || '';
    localStorage.setItem("fynderUser", JSON.stringify(user));
    document.getElementById("userName").textContent = "Hola, " + user.name;
    _saveCurrentAccount();  // sincronizar cambios en la lista de cuentas
    showToast("¡Perfil actualizado correctamente! ✓");
    loadProfile();
}

function changePassword(event){
    event.preventDefault();
    const user        = JSON.parse(localStorage.getItem("fynderUser"));
    const current     = document.getElementById("currentPass").value;
    const newP        = document.getElementById("newPass").value;
    const confirmNewP = document.getElementById("confirmNewPass").value;
    if(!user) return;
    if(current !== user.pass){
        showToast("La contraseña actual no es correcta.", "error"); return;
    }
    if(newP !== confirmNewP){
        showToast("Las contraseñas nuevas no coinciden.", "error"); return;
    }
    if(newP.length < 6){
        showToast("La contraseña debe tener al menos 6 caracteres.", "error"); return;
    }
    user.pass = newP;
    localStorage.setItem("fynderUser", JSON.stringify(user));
    document.getElementById("passForm").reset();
    showToast("¡Contraseña actualizada correctamente! 🔐");
}

function deleteAccount(){
    if(!confirm("¿Seguro que deseas eliminar tu cuenta? Esta acción no se puede deshacer.")) return;
    localStorage.removeItem("fynderUser");
    localStorage.removeItem("fynderLogged");
    localStorage.removeItem("fynderAvatarPhoto");
    localStorage.removeItem("fynderCoverPhoto");
    document.getElementById("userName").textContent = "";
    updateNav();
    showToast("Cuenta eliminada. ¡Hasta pronto!");
    goPage("home");
}

function togglePassVisibility(inputId, btn){
    const input = document.getElementById(inputId);
    const icon  = btn.querySelector("i");
    if(input.type === "password"){
        input.type = "text";
        icon.classList.replace("fa-eye", "fa-eye-slash");
    }else{
        input.type = "password";
        icon.classList.replace("fa-eye-slash", "fa-eye");
    }
}

function showToast(msg, type = "success"){
    let toast = document.getElementById("fynderToast");
    if(!toast){
        toast = document.createElement("div");
        toast.id = "fynderToast";
        document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.className = "fynder-toast " + (type === "error" ? "toast-error" : "toast-ok");
    toast.classList.add("toast-show");
    clearTimeout(toast._timer);
    toast._timer = setTimeout(()=> toast.classList.remove("toast-show"), 3500);
}

window.addEventListener("load", ()=>{
    const logged = localStorage.getItem("fynderLogged");
    const user   = JSON.parse(localStorage.getItem("fynderUser"));
    if(logged && user){
        document.getElementById("userName").textContent = "Hola, " + user.name;
    }
    updateNav();
});

function registerBusiness(event) {
    event.preventDefault();

    const name      = document.getElementById("bizName").value.trim();
    const category  = document.getElementById("bizCategory").value;
    const desc      = document.getElementById("bizDesc").value.trim();
    const address   = document.getElementById("bizAddress").value.trim();
    const phone     = document.getElementById("bizPhone").value.trim();
    const hours     = document.getElementById("bizHours").value.trim();
    const website   = document.getElementById("bizWebsite").value.trim();
    const instagram = document.getElementById("bizInstagram").value.trim();
    const facebook  = document.getElementById("bizFacebook").value.trim();

    const business = { name, category, desc, address, phone, hours, website, instagram, facebook };

    // Guardar en localStorage (demo)
    const saved = JSON.parse(localStorage.getItem("fynderBusinesses") || "[]");
    saved.push(business);
    localStorage.setItem("fynderBusinesses", JSON.stringify(saved));

    showToast("¡Negocio publicado exitosamente! 🚀 Ya está visible en el directorio.");
    document.getElementById("businessForm").reset();
    goPage("home");
}

function subscribeBlog(event) {
    event.preventDefault();
    const email = document.getElementById("blogEmail").value.trim();
    if (!email) return;
    // Demo: guardar en localStorage
    const subs = JSON.parse(localStorage.getItem("fynderBlogSubs") || "[]");
    if (subs.includes(email)) {
        showToast("Este correo ya está suscrito.", "error");
        return;
    }
    subs.push(email);
    localStorage.setItem("fynderBlogSubs", JSON.stringify(subs));
    document.getElementById("blogEmail").value = "";
    showToast("¡Suscripción exitosa! Te avisaremos cuando haya nuevo contenido 📬");
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
  document.getElementById('artCatLabel').textContent = art.category;
  document.getElementById('artCatLabel').style.color = art.color;
  document.getElementById('artTitle').textContent = art.title;
  document.getElementById('artAuthorAv').style.background = `linear-gradient(${art.authorGrad})`;
  document.getElementById('artAuthorAv').textContent = art.authorInitial;
  document.getElementById('artAuthorName').textContent = art.author;
  document.getElementById('artDate').textContent = art.date;
  document.getElementById('artReadTime').textContent = art.readTime;
  document.getElementById('artBody').innerHTML = art.body;

  _currentArticleId = id;
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

function sendSupport(event) {
    event.preventDefault();
    const name    = document.getElementById("supportName").value.trim();
    const email   = document.getElementById("supportEmail").value.trim();
    const subject = document.getElementById("supportSubject").value;
    const msg     = document.getElementById("supportMsg").value.trim();
    if (!name || !email || !subject || !msg) return;
    // Demo: guardar en localStorage
    const tickets = JSON.parse(localStorage.getItem("fynderSupportTickets") || "[]");
    tickets.push({ name, email, subject, msg, date: new Date().toISOString() });
    localStorage.setItem("fynderSupportTickets", JSON.stringify(tickets));
    document.getElementById("supportForm").reset();
    showToast("¡Mensaje enviado! Te responderemos en menos de 24 horas 💬");
}

/*modo oscuro*/
function toggleDarkMode(){
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const next   = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('fynderTheme', next);
    // Actualizar navbar scrolled en modo oscuro
    _applyNavbarTheme();
}

function _applyNavbarTheme(){
    const navbar = document.getElementById('navbar');
    if(!navbar) return;
    // Si está scrolled, el CSS ya lo maneja; solo forzamos repaint
    navbar.style.transition = 'background .3s, box-shadow .3s';
}

// iniciar tema guardado
(function initTheme(){
    const saved = localStorage.getItem('fynderTheme');
    if(saved === 'dark'){
        document.documentElement.setAttribute('data-theme', 'dark');
    }
})();

/* ── Auto-estado al cerrar la pestaña/navegador ── */
window.addEventListener('beforeunload', function(){
    if(localStorage.getItem('fynderLogged')){
        localStorage.setItem('fynderUserStatus', 'offline');
    }
});


// panel del usuario

// datos de planes
const PLAN_DATA = {
  basico: {
    name: 'Básico',
    price: '$0',
    period: 'para siempre',
    icon: '🏪',
    iconBg: '#E6F5F4',
    iconColor: '#67B8B4',
    badge: 'dash-plan-badge-free',
    level: 0
  },
  pro: {
    name: 'Pro',
    price: '$9.99',
    period: '/ mes',
    icon: '⚡',
    iconBg: 'linear-gradient(135deg,#1E8F8B,#2F5BB7)',
    iconColor: '#fff',
    badge: 'dash-plan-badge-pro',
    level: 1
  },
  business: {
    name: 'Business',
    price: '$24.99',
    period: '/ mes',
    icon: '🏢',
    iconBg: '#EEF2FF',
    iconColor: '#2F5BB7',
    badge: 'dash-plan-badge-biz',
    level: 2
  },
  premium: {
    name: 'Premium',
    price: '$59.99',
    period: '/ mes',
    icon: '👑',
    iconBg: 'linear-gradient(135deg,#7c3aed,#a855f7)',
    iconColor: '#fff',
    badge: 'dash-plan-badge-premium',
    level: 3
  }
};

// datos de analiticas simulados
function generateAnalytics(period) {
  const bizCount = JSON.parse(localStorage.getItem('fynderBusinesses') || '[]').length;
  const base = Math.max(bizCount * 15, 5);
  const seed = period === '7d' ? 1 : period === '30d' ? 4.5 : 12;

  const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  const views   = rand(Math.floor(base * seed * 0.8), Math.floor(base * seed * 1.4));
  const saves   = rand(Math.floor(views * 0.12), Math.floor(views * 0.22));
  const clicks  = rand(Math.floor(views * 0.08), Math.floor(views * 0.18));
  const reviews = rand(0, Math.max(1, Math.floor(views * 0.04)));

  const deltaViews   = rand(-15, 35);
  const deltaSaves   = rand(-10, 40);
  const deltaClicks  = rand(-8, 30);
  const deltaReviews = rand(0, 20);

  return { views, saves, clicks, reviews, deltaViews, deltaSaves, deltaClicks, deltaReviews };
}

// etiquetas para la grafica
function generateChartLabels(period) {
  const days = period === '7d' ? 7 : period === '30d' ? 10 : 12;
  const labels = [];
  const now = new Date();
  const step = period === '90d' ? 7 : (period === '30d' ? 3 : 1);
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i * step);
    labels.push(d.getDate() + '/' + (d.getMonth() + 1));
  }
  return labels;
}

// datos de visitas
function generateChartData(period) {
  const points = period === '7d' ? 7 : period === '30d' ? 10 : 12;
  const base = Math.max(JSON.parse(localStorage.getItem('fynderBusinesses') || '[]').length * 2, 2);
  const multiplier = period === '7d' ? 8 : period === '30d' ? 20 : 60;
  return Array.from({ length: points }, () =>
    Math.floor(Math.random() * base * multiplier + base * 3)
  );
}

let dashChart = null;

function renderDashChart(period) {
  const canvas = document.getElementById('dashChartVisits');
  if (!canvas) return;

  const labels = generateChartLabels(period);
  const data   = generateChartData(period);
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

  const gridColor  = isDark ? 'rgba(255,255,255,.07)' : 'rgba(0,0,0,.06)';
  const labelColor = isDark ? '#94A3B8' : '#6B7280';
  const lineColor  = '#67B8B4';
  const fillColor  = isDark ? 'rgba(103,184,180,.12)' : 'rgba(103,184,180,.15)';

  // Destruir gráfica anterior si existe
  if (dashChart) { dashChart.destroy(); dashChart = null; }

  // Usamos Canvas API directamente (sin Chart.js para no añadir dependencias)
  const ctx = canvas.getContext('2d');
  const W = canvas.offsetWidth || 700;
  const H = 220;
  canvas.width  = W;
  canvas.height = H;

  const pad = { top: 20, right: 20, bottom: 40, left: 44 };
  const chartW = W - pad.left - pad.right;
  const chartH = H - pad.top - pad.bottom;
  const maxVal = Math.max(...data) * 1.15 || 10;

  ctx.clearRect(0, 0, W, H);

  // Grid lines
  const gridLines = 5;
  ctx.strokeStyle = gridColor;
  ctx.lineWidth = 1;
  for (let i = 0; i <= gridLines; i++) {
    const y = pad.top + (chartH / gridLines) * i;
    ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(W - pad.right, y); ctx.stroke();

    // Labels eje Y
    const val = Math.round(maxVal - (maxVal / gridLines) * i);
    ctx.fillStyle = labelColor;
    ctx.font = '11px Inter, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(val >= 1000 ? (val/1000).toFixed(1)+'k' : val, pad.left - 6, y + 4);
  }

  // Points x
  const xs = labels.map((_, i) => pad.left + (chartW / (labels.length - 1)) * i);
  const ys = data.map(v => pad.top + chartH - (v / maxVal) * chartH);

  // Fill area
  const grad = ctx.createLinearGradient(0, pad.top, 0, pad.top + chartH);
  grad.addColorStop(0, fillColor);
  grad.addColorStop(1, 'rgba(103,184,180,0)');
  ctx.beginPath();
  ctx.moveTo(xs[0], ys[0]);
  for (let i = 1; i < xs.length; i++) {
    const cpx = (xs[i-1] + xs[i]) / 2;
    ctx.bezierCurveTo(cpx, ys[i-1], cpx, ys[i], xs[i], ys[i]);
  }
  ctx.lineTo(xs[xs.length-1], pad.top + chartH);
  ctx.lineTo(xs[0], pad.top + chartH);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  // Line
  ctx.beginPath();
  ctx.moveTo(xs[0], ys[0]);
  for (let i = 1; i < xs.length; i++) {
    const cpx = (xs[i-1] + xs[i]) / 2;
    ctx.bezierCurveTo(cpx, ys[i-1], cpx, ys[i], xs[i], ys[i]);
  }
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Dots
  xs.forEach((x, i) => {
    ctx.beginPath();
    ctx.arc(x, ys[i], 4, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 2;
    ctx.stroke();
  });

  // Labels eje X
  ctx.fillStyle = labelColor;
  ctx.font = '11px Inter, sans-serif';
  ctx.textAlign = 'center';
  const step = Math.max(1, Math.floor(labels.length / 7));
  labels.forEach((lbl, i) => {
    if (i % step === 0 || i === labels.length - 1) {
      ctx.fillText(lbl, xs[i], H - 10);
    }
  });
}

let currentDashPeriod = '7d';

function changePeriod(period, btn) {
  currentDashPeriod = period;
  document.querySelectorAll('.dash-period-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  updateDashStats(period);
  renderDashChart(period);
}

function updateDashStats(period) {
  const plan = localStorage.getItem('fynderPlan') || 'basico';
  const isLocked = plan === 'basico';

  const statIds = ['statViews','statSaves','statClicks','statReviews'];
  const deltaIds = ['statViewsDelta','statSavesDelta','statClicksDelta','statReviewsDelta'];

  if (isLocked) {
    statIds.forEach(id => { const el = document.getElementById(id); if(el) el.textContent = '—'; });
    deltaIds.forEach(id => { const el = document.getElementById(id); if(el) el.textContent = ''; });
    return;
  }

  const d = generateAnalytics(period);
  const vals   = [d.views, d.saves, d.clicks, d.reviews];
  const deltas = [d.deltaViews, d.deltaSaves, d.deltaClicks, d.deltaReviews];

  statIds.forEach((id, i) => {
    const el = document.getElementById(id);
    if (el) el.textContent = vals[i].toLocaleString('es');
  });

  deltaIds.forEach((id, i) => {
    const el = document.getElementById(id);
    if (!el) return;
    const delta = deltas[i];
    const sign  = delta >= 0 ? '+' : '';
    el.textContent = sign + delta + '% vs período anterior';
    el.className   = 'dash-stat-delta ' + (delta >= 0 ? 'up' : 'down');
  });
}

function loadDashboard() {
  const user = JSON.parse(localStorage.getItem('fynderUser'));
  if (!user) { goPage('login'); return; }

  // Bienvenida
  const welcome = document.getElementById('dashWelcome');
  if (welcome) welcome.textContent = 'Hola, ' + user.name + ' 👋';

  const plan = localStorage.getItem('fynderPlan') || 'basico';
  const planInfo = PLAN_DATA[plan] || PLAN_DATA.basico;

  // ---- Plan card ----
  const planCard = document.getElementById('dashPlanCard');
  if (planCard) {
    const since = localStorage.getItem('fynderPlanSince') || 'Hoy';
    planCard.innerHTML = `
      <div class="dash-plan-icon" style="background:${planInfo.iconBg};color:${planInfo.iconColor};font-size:1.6rem">
        ${planInfo.icon}
      </div>
      <div class="dash-plan-info">
        <h3 class="dash-plan-name">Plan ${planInfo.name}</h3>
        <p class="dash-plan-meta">Activo desde: ${since}</p>
        <span class="dash-plan-badge ${planInfo.badge}">
          <i class="fas fa-circle" style="font-size:.4rem"></i> Activo
        </span>
      </div>
      <div class="dash-plan-price-block">
        <div class="dash-plan-price">${planInfo.price}</div>
        <span class="dash-plan-period">${planInfo.period}</span>
        <div style="margin-top:12px">
          <button class="dash-biz-btn" onclick="goPage('plans')" style="font-size:.78rem">
            <i class="fas fa-arrow-right-arrow-left"></i> Cambiar plan
          </button>
        </div>
      </div>
    `;
  }

  // ---- Upgrade strip ----
  const upgradeStrip = document.getElementById('dashUpgradeStrip');
  if (upgradeStrip) upgradeStrip.style.display = planInfo.level >= 3 ? 'none' : 'flex';

  // ---- Plan badge en gráfica ----
  const chartBadge = document.getElementById('dashPlanBadgeChart');
  if (chartBadge) {
    chartBadge.textContent = 'Plan ' + planInfo.name;
    chartBadge.className = 'dash-chart-badge ' + planInfo.badge;
  }

  // ---- Locked overlay ----
  const lockedOverlay = document.getElementById('dashLockedOverlay');
  const isLocked = planInfo.level === 0;
  if (lockedOverlay) lockedOverlay.style.display = isLocked ? 'flex' : 'none';

  // ---- Stats ----
  updateDashStats(currentDashPeriod);

  // ---- Gráfica ----
  setTimeout(() => renderDashChart(currentDashPeriod), 80);

  // ---- Negocios ----
  const bizList = document.getElementById('dashBizList');
  if (bizList) {
    const businesses = JSON.parse(localStorage.getItem('fynderBusinesses') || '[]');
    if (businesses.length === 0) {
      bizList.innerHTML = `
        <div class="dash-biz-empty">
          <i class="fas fa-store"></i>
          Aún no tienes negocios registrados.
          <br><br>
          <button class="btn-teal" style="padding:10px 20px" onclick="goPage('business')">
            <i class="fas fa-plus" style="font-size:.7rem"></i> Registrar negocio
          </button>
        </div>
      `;
    } else {
      bizList.innerHTML = businesses.map((biz, i) => {
        const catObj = CATEGORIES.find(c => c.id === biz.category);
        const emoji  = catObj ? '' : '🏪';
        return `
          <div class="dash-biz-item">
            <div class="dash-biz-emoji" style="${catObj ? 'background:'+catObj.bg+';' : ''}">
              ${catObj ? catObj.svg : emoji}
            </div>
            <div class="dash-biz-info">
              <p class="dash-biz-name">${biz.name || 'Sin nombre'}</p>
              <span class="dash-biz-cat">${catObj ? catObj.label : (biz.category || 'Sin categoría')} ${biz.city ? '· ' + biz.city : ''}</span>
            </div>
            <div class="dash-biz-actions">
              <button class="dash-biz-btn" onclick="openBusinessDetail(${i})">
                <i class="fas fa-eye"></i> Ver
              </button>
            </div>
          </div>
        `;
      }).join('');
    }
  }

  // ---- Actividad reciente ----
  const activityList = document.getElementById('dashActivityList');
  if (activityList) {
    const businesses = JSON.parse(localStorage.getItem('fynderBusinesses') || '[]');
    const activities = [];

    activities.push({ dot: '#10B981', text: 'Sesión iniciada correctamente', time: 'Ahora' });
    if (businesses.length > 0) {
      activities.push({ dot: '#67B8B4', text: `Negocio "${businesses[businesses.length-1].name || 'Sin nombre'}" registrado`, time: 'Reciente' });
    }
    if (favorites && favorites.size > 0) {
      activities.push({ dot: '#F4D35E', text: `${favorites.size} negocio${favorites.size!==1?'s':''} guardado${favorites.size!==1?'s':''}`, time: 'Esta sesión' });
    }
    activities.push({ dot: '#2F5BB7', text: `Plan ${planInfo.name} activo`, time: since || 'Hoy' });

    activityList.innerHTML = activities.map(a => `
      <div class="dash-activity-item">
        <span class="dash-activity-dot" style="background:${a.dot}"></span>
        <span class="dash-activity-text">${a.text}</span>
        <span class="dash-activity-time">${a.time}</span>
      </div>
    `).join('');
  }
}

// abre detalle del negocio
function openBusinessDetail(index) {
  const businesses = JSON.parse(localStorage.getItem('fynderBusinesses') || '[]');
  const biz = businesses[index];
  if (!biz) return;
  // Buscar en BUSINESSES por nombre
  const match = BUSINESSES.find(b => b.name === biz.name);
  if (match) {
    openModal(match.id);
  } else {
    showToast('Este negocio aún no está en el directorio público.');
  }
}


// animaciones pagina saber mas

let fynderObserver = null;

function initFynderAnimations() {
  const page = document.getElementById('page-fynder');
  if (!page) return;

  // Marcar elementos animables
  const animTargets = [
    { sel: '.fyl-what-card',    parent: '.fyl-what-grid' },
    { sel: '.fyl-feature',      parent: '.fyl-features-grid' },
    { sel: '.fyl-step',         parent: '.fyl-steps' },
    { sel: '.fyl-impact-card',  parent: '.fyl-impact-grid' },
    { sel: '.fyl-testi',        parent: '.fyl-testimonials' },
    { sel: '.fyl-for-card',     parent: '.fyl-for-grid' },
    { sel: '.fyl-cat',          parent: '.fyl-cats' },
  ];

  animTargets.forEach(({ sel }) => {
    page.querySelectorAll(sel).forEach(el => {
      el.classList.add('fyl-animate-child');
    });
  });

  // Secciones completas
  page.querySelectorAll('.fyl-section-label, .fyl-section-title, .fyl-section-lead, .fyl-steps, .fyl-compare, .fyl-faq, .fyl-impact-grid, .fyl-cta, .fyl-what-grid, .fyl-features-grid, .fyl-cats, .fyl-testimonials, .fyl-for-grid').forEach(el => {
    if (!el.classList.contains('fyl-animate-child')) {
      el.classList.add('fyl-animate');
    }
  });

  // Disconnect observer anterior si existe
  if (fynderObserver) fynderObserver.disconnect();

  fynderObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fyl-visible');
        // Una vez visible no necesitamos seguir observando
        fynderObserver.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  // Observar todos los elementos animables
  page.querySelectorAll('.fyl-animate, .fyl-animate-child').forEach(el => {
    fynderObserver.observe(el);
  });

  // Hero visible inmediatamente
  page.querySelectorAll('.fyl-hero-content > *, .fyl-hero-visual, .fyl-hero-badge').forEach((el, i) => {
    el.style.animation = `fyl-fade-up .5s cubic-bezier(.22,1,.36,1) ${i * 0.1}s both`;
  });

  // Añadir efecto ripple a botones de categoría al click
  page.querySelectorAll('.fyl-cat').forEach(btn => {
    btn.addEventListener('click', createRipple, { once: false });
  });

  // Ripple en botones principales también
  page.querySelectorAll('.fyl-btn-primary, .fyl-for-btn-teal, .fyl-for-btn-purple, .fyl-cta-btn').forEach(btn => {
    btn.addEventListener('click', createRipple);
  });
}

function createRipple(e) {
  const btn = e.currentTarget;
  // Evitar duplicar el listener
  const existing = btn.querySelector('.fyl-ripple-el');
  if (existing) existing.remove();

  const rect   = btn.getBoundingClientRect();
  const size   = Math.max(rect.width, rect.height) * 2;
  const x      = e.clientX - rect.left - size / 2;
  const y      = e.clientY - rect.top  - size / 2;

  const ripple = document.createElement('span');
  ripple.className = 'fyl-ripple-el';
  ripple.style.cssText = `
    position:absolute;
    width:${size}px;height:${size}px;
    left:${x}px;top:${y}px;
    border-radius:50%;
    background:rgba(255,255,255,.28);
    transform:scale(0);
    animation:fyl-ripple .55s linear forwards;
    pointer-events:none;
    z-index:0;
  `;
  btn.style.position = btn.style.position || 'relative';
  btn.style.overflow = 'hidden';
  btn.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
}


// menu movil

function toggleMobileMenu() {
  const drawer  = document.getElementById('mobileMenuDrawer');
  const overlay = document.getElementById('mobileMenuOverlay');
  const burger  = document.getElementById('navHamburger');
  const isOpen  = drawer.classList.contains('open');
  if (isOpen) {
    closeMobileMenu();
  } else {
    drawer.classList.add('open');
    overlay.classList.add('open');
    if (burger) burger.classList.add('open');
    document.body.style.overflow = 'hidden';
    updateMobileMenuActions();
    // Mostrar/ocultar botón Salir según sesión
    const salirBtn = document.getElementById('mobileMenuSalirBtn');
    if (salirBtn) salirBtn.style.display = localStorage.getItem('fynderLogged') ? '' : 'none';
    setTimeout(_applyDrawerAvatarBg, 10);
  }
}

function closeMobileMenu() {
  document.getElementById('mobileMenuDrawer').classList.remove('open');
  document.getElementById('mobileMenuOverlay').classList.remove('open');
  const burger = document.getElementById('navHamburger');
  if (burger) burger.classList.remove('open');
  document.body.style.overflow = '';
  // Cerrar también todos los submenús
  document.querySelectorAll('.mobile-submenu.open').forEach(s => s.classList.remove('open'));
  document.querySelectorAll('.mobile-menu-has-sub.sub-open').forEach(b => b.classList.remove('sub-open'));
}

/** Despliega/colapsa un submenú en el menú móvil */
function toggleMobileSubMenu(id, btn) {
  const sub = document.getElementById(id);
  if (!sub) return;
  const isOpen = sub.classList.contains('open');
  // Cerrar todos los demás
  document.querySelectorAll('.mobile-submenu.open').forEach(s => { if (s !== sub) s.classList.remove('open'); });
  document.querySelectorAll('.mobile-menu-has-sub.sub-open').forEach(b => { if (b !== btn) b.classList.remove('sub-open'); });
  sub.classList.toggle('open', !isOpen);
  if (btn) btn.classList.toggle('sub-open', !isOpen);
}

/** Traducir página (usa Web Share o navigator.language como fallback) */
function mobileTranslate() {
  const url = `https://translate.google.com/translate?hl=es&sl=auto&tl=es&u=${encodeURIComponent(location.href)}`;
  window.open(url, '_blank');
}

/** Compartir página actual */
async function mobileShare() {
  const data = { title: 'Fynder – Descubre Negocios Locales', url: location.href };
  try {
    if (navigator.share) {
      await navigator.share(data);
    } else {
      await navigator.clipboard.writeText(location.href);
      showToast('🔗 Enlace copiado al portapapeles');
    }
  } catch {
    showToast('No se pudo compartir');
  }
}

/** Copiar enlace al portapapeles */
async function mobileCopyLink() {
  try {
    await navigator.clipboard.writeText(location.href);
    showToast('🔗 Enlace copiado');
  } catch {
    showToast('No se pudo copiar el enlace');
  }
}

// cerrar menu al navegar
const _origGoPage = goPage;
// se cierra en goPage
function updateMobileMenuActions() {
  const logged = !!localStorage.getItem('fynderLogged');
  const user   = JSON.parse(localStorage.getItem('fynderUser') || 'null');
  const el     = document.getElementById('mobileMenuActions');
  if (!el) return;

  if (logged && user) {
    el.innerHTML = `
      <div class="mobile-menu-user-info" onclick="toggleAccountSwitcher()" style="cursor:pointer">
        <div class="mobile-menu-avatar">${_buildDrawerAvatar(user)}</div>
        <div style="flex:1;min-width:0">
          <strong>${user.name}</strong>
          <span>${user.email || ''}</span>
        </div>
        <i class="fas fa-chevron-down mobile-account-chevron" id="accountChevron" style="font-size:.7rem;color:var(--muted);transition:transform .25s;flex-shrink:0"></i>
      </div>

      <!-- Panel de cuentas guardadas -->
      <div class="mobile-accounts-panel" id="mobileAccountsPanel">
        ${_buildSavedAccountsList()}
        <button class="mobile-add-account-btn" onclick="_openAddAccountFlow()">
          <i class="fas fa-plus-circle"></i> Agregar otra cuenta
        </button>
      </div>

      <button class="mobile-action-btn mobile-action-panel" onclick="closeMobileMenu();goPage('dashboard')">
        <i class="fas fa-chart-line"></i> Mi panel
      </button>
      <button class="mobile-action-btn mobile-action-profile" onclick="closeMobileMenu();goPage('profile')">
        <i class="fas fa-user-circle"></i> Mi perfil
      </button>
      <button class="mobile-action-btn mobile-action-biz" onclick="closeMobileMenu();goPage('business')">
        <i class="fas fa-plus"></i> Registrar negocio
      </button>
      <button class="mobile-action-btn mobile-action-logout" onclick="closeMobileMenu();logout()">
        <i class="fas fa-right-from-bracket"></i> Cerrar sesión
      </button>`;
  } else {
    el.innerHTML = `
      <button class="mobile-action-btn mobile-action-biz" onclick="closeMobileMenu();goPage('business')">
        <i class="fas fa-plus"></i> Registrar negocio
      </button>
      <button class="mobile-action-btn mobile-action-login" onclick="closeMobileMenu();goPage('login')">
        <i class="fas fa-right-to-bracket"></i> Iniciar sesión
      </button>
      <button class="mobile-action-btn mobile-action-register-acc" onclick="closeMobileMenu();goPage('register')">
        <i class="fas fa-user-plus"></i> Crear cuenta
      </button>`;
  }
}

/* ── Construye el HTML del avatar para el drawer (foto / emoji / iniciales) ── */
function _buildDrawerAvatar(user, size) {
  const px = size || 38;
  const stored = localStorage.getItem('fynderAvatarPhoto');
  const preset = localStorage.getItem('fynderAvatarPreset');
  const initBg = localStorage.getItem('fynderAvatarInitialBg');

  if (stored) {
    return `<img src="${stored}" alt="Avatar" style="width:${px}px;height:${px}px;object-fit:cover;border-radius:50%;display:block">`;
  } else if (preset) {
    return `<span style="font-size:${Math.round(px*0.5)}px;line-height:1">${preset}</span>`;
  } else {
    const initials = user?.name ? _getInitials(user.name) : '?';
    const bg = initBg || 'linear-gradient(135deg,#67B8B4,#2F5BB7)';
    return `<span data-avatar-bg="${bg}" style="font-size:${Math.round(px*0.42)}px;font-weight:800;color:#fff;font-family:'Poppins',sans-serif">${initials}</span>`;
  }
}

/* Aplica el fondo al avatar si es de tipo iniciales (necesita el span con data-avatar-bg) */
function _applyDrawerAvatarBg() {
  document.querySelectorAll('[data-avatar-bg]').forEach(span => {
    const bg = span.getAttribute('data-avatar-bg');
    if (span.parentElement) span.parentElement.style.background = bg;
  });
}

/* ── Cuentas guardadas ── */
function _getSavedAccounts() {
  return JSON.parse(localStorage.getItem('fynderSavedAccounts') || '[]');
}
function _setSavedAccounts(arr) {
  localStorage.setItem('fynderSavedAccounts', JSON.stringify(arr));
}

/* Guarda la cuenta actual en la lista de cuentas guardadas */
function _saveCurrentAccount() {
  const user = JSON.parse(localStorage.getItem('fynderUser') || 'null');
  if (!user) return;
  const accounts = _getSavedAccounts();
  const idx = accounts.findIndex(a => a.email === user.email);
  const entry = {
    name:      user.name,
    email:     user.email,
    pass:      user.pass,
    city:      user.city  || '',
    bio:       user.bio   || '',
    phone:     user.phone || '',
    avatarPhoto:  localStorage.getItem('fynderAvatarPhoto')  || null,
    avatarPreset: localStorage.getItem('fynderAvatarPreset') || null,
    avatarInitBg: localStorage.getItem('fynderAvatarInitialBg') || null,
    favorites: JSON.stringify([...favorites])
  };
  if (idx >= 0) accounts[idx] = entry;
  else accounts.push(entry);
  _setSavedAccounts(accounts);
}

function _buildSavedAccountsList() {
  const accounts = _getSavedAccounts();
  const currentEmail = JSON.parse(localStorage.getItem('fynderUser') || '{}').email;
  if (accounts.length === 0) return '';

  return accounts.map(acc => {
    const isActive = acc.email === currentEmail;
    const avatarHtml = acc.avatarPhoto
      ? `<img src="${acc.avatarPhoto}" style="width:32px;height:32px;object-fit:cover;border-radius:50%;display:block">`
      : acc.avatarPreset
        ? `<span style="font-size:16px;line-height:1">${acc.avatarPreset}</span>`
        : `<span style="font-size:13px;font-weight:800;color:#fff;font-family:'Poppins',sans-serif">${_getInitials(acc.name)}</span>`;
    const bg = acc.avatarPhoto || acc.avatarPreset ? 'transparent' : (acc.avatarInitBg || 'linear-gradient(135deg,#67B8B4,#2F5BB7)');

    return `
      <button class="mobile-saved-account ${isActive ? 'active' : ''}" onclick="_switchToAccount('${acc.email}')" ${isActive ? 'disabled' : ''}>
        <div class="mobile-saved-account-avatar" style="background:${bg}">${avatarHtml}</div>
        <div style="flex:1;min-width:0;text-align:left">
          <strong>${acc.name}</strong>
          <span>${acc.email}</span>
        </div>
        ${isActive ? '<i class="fas fa-check" style="color:var(--primary);font-size:.75rem;flex-shrink:0"></i>' : '<i class="fas fa-arrow-right-to-bracket" style="color:var(--muted);font-size:.7rem;flex-shrink:0"></i>'}
      </button>`;
  }).join('');
}

function toggleAccountSwitcher() {
  const panel   = document.getElementById('mobileAccountsPanel');
  const chevron = document.getElementById('accountChevron');
  if (!panel) return;
  const open = panel.classList.toggle('open');
  if (chevron) chevron.style.transform = open ? 'rotate(180deg)' : '';
  // Aplicar fondo a avatares de iniciales tras abrir
  if (open) setTimeout(_applyDrawerAvatarBg, 10);
}

function _switchToAccount(email) {
  // Guardar estado de la cuenta actual antes de cambiar
  _saveCurrentAccount();

  const accounts = _getSavedAccounts();
  const acc = accounts.find(a => a.email === email);
  if (!acc) return;

  // Restaurar usuario
  const userObj = { name: acc.name, email: acc.email, pass: acc.pass, city: acc.city, bio: acc.bio, phone: acc.phone };
  localStorage.setItem('fynderUser', JSON.stringify(userObj));
  localStorage.setItem('fynderLogged', 'true');
  localStorage.setItem('fynderUserStatus', 'active');

  // Restaurar avatar
  if (acc.avatarPhoto)  localStorage.setItem('fynderAvatarPhoto',      acc.avatarPhoto);
  else                  localStorage.removeItem('fynderAvatarPhoto');
  if (acc.avatarPreset) localStorage.setItem('fynderAvatarPreset',     acc.avatarPreset);
  else                  localStorage.removeItem('fynderAvatarPreset');
  if (acc.avatarInitBg) localStorage.setItem('fynderAvatarInitialBg',  acc.avatarInitBg);
  else                  localStorage.removeItem('fynderAvatarInitialBg');

  // Restaurar favoritos
  if (acc.favorites) {
    const favArr = JSON.parse(acc.favorites || '[]');
    favorites.clear();
    favArr.forEach(id => favorites.add(id));
    localStorage.setItem('fynderFavorites', acc.favorites);
  }

  document.getElementById('userName').textContent = 'Hola, ' + acc.name;
  updateNav();
  closeMobileMenu();
  showToast(`Cambiado a ${acc.name} ✓`);
}

function _openAddAccountFlow() {
  // Guardar cuenta actual antes de salir
  _saveCurrentAccount();
  // Cerrar sesión temporalmente y llevar al login con flag
  localStorage.setItem('fynderAddingAccount', '1');
  closeMobileMenu();
  logout(true); // true = silencioso, no mostrar toast ni redirigir
  goPage('login');
  showToast('Inicia sesión con la nueva cuenta');
}

/* Sobrescribir logout para soportar modo silencioso */
const _origLogout = typeof logout === 'function' ? logout : null;
function logout(silent) {
  localStorage.setItem('fynderUserStatus', 'offline');
  localStorage.removeItem('fynderLogged');
  document.getElementById('userName').textContent = '';
  favorites.clear();
  localStorage.removeItem('fynderFavorites');
  updateNav();
  if (!silent) {
    showToast('Sesión cerrada. ¡Hasta pronto!');
    goPage('home');
  }
}

// cerrar al hacer click
document.addEventListener('click', e => {
  const drawer = document.getElementById('mobileMenuDrawer');
  if (drawer && drawer.classList.contains('open')) {
    // Si el click fue en un botón de navegación dentro del drawer, ya se cierra por closeMobileMenu()
  }
});

// cerrar con tecla escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeMobileMenu();
});


// animaciones pagina about

function initAboutPage() {
  spawnAboutParticles();
  animateAboutBars();
  animateAboutCounters();
}

function spawnAboutParticles() {
  const wrap = document.getElementById('aboutParticles');
  if (!wrap) return;
  wrap.innerHTML = '';
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.className = 'about-particle';
    p.style.cssText = `
      left:${Math.random()*100}%;
      top:${40 + Math.random()*50}%;
      animation-delay:${Math.random()*3}s;
      animation-duration:${2.5 + Math.random()*2}s;
      width:${3 + Math.random()*4}px;
      height:${3 + Math.random()*4}px;
      background:rgba(${Math.random()>.5?'103,184,180':'244,211,94'},${0.4+Math.random()*.4});
    `;
    wrap.appendChild(p);
  }
}

function animateAboutBars() {
  const bars = document.querySelectorAll('#page-about .about-impact-bar-fill');
  if (!bars.length) return;
  setTimeout(() => {
    bars.forEach(bar => {
      const w = bar.style.width;
      bar.style.width = '0';
      requestAnimationFrame(() => { bar.style.width = w; });
    });
  }, 300);
}

function animateAboutCounters() {
  // Stat 0: 85 negocios
  animateCount('aStat0', 0, 85, 1200, '', '');
  // Stat 2: 4.8 rating
  animateCount('aStat2', 0, 4.8, 1400, '', '★', 1);
}

function animateCount(id, from, to, duration, prefix, suffix, decimals = 0) {
  const el = document.getElementById(id);
  if (!el) return;
  const start = performance.now();
  function step(now) {
    const p = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    const val = from + (to - from) * ease;
    el.textContent = prefix + (decimals ? val.toFixed(decimals) : Math.round(val)) + suffix;
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}


/* ================================================================
   MAPA DE NEGOCIOS — Motor completo
   ================================================================ */

// Coordenadas de los negocios (Panama City y alrededores)
const BIZ_COORDS = {
  "1":  [8.9936, -79.5197],  // Centro
  "2":  [8.9914, -79.5302],  // Zona Rosa
  "3":  [9.0007, -79.5200],  // Plaza
  "5":  [8.9878, -79.5150],  // Barrio El Jardín
  "6":  [8.9945, -79.5260],  // Col. Médica
  "7":  [9.0021, -79.5185],  // Paseo Comercial
  "8":  [9.0044, -79.5310],  // Las Palmas Blvd Norte
  "9":  [8.9830, -79.5280],  // Calle 50 Miraflores
  "10": [8.9921, -79.5350],  // Vía Argentina
  "11": [8.9880, -79.5420],  // Av. Balboa Bella Vista
  "12": [8.9505, -79.5348],  // San Felipe
  "13": [9.0100, -79.5230],  // Tumba Muerto
  "14": [8.9832, -79.4978],  // Paitilla
  "15": [8.9521, -79.5340],  // Casco Viejo
  "16": [8.9898, -79.5275],  // Bella Vista
  "17": [8.9958, -79.5078],  // San Francisco
  "18": [8.9630, -79.5412],  // El Chorrillo
  "19": [9.0080, -79.5140],  // Av. Ricardo Alfaro
  "20": [9.0170, -79.5155],  // El Dorado
  "21": [8.9802, -79.5055],  // Punta Pacífica
  "22": [8.9841, -79.5090],  // Calle 50 San Francisco
  "23": [8.9905, -79.5330],  // El Cangrejo
  "300":[9.0052, -79.5320],
  "301":[9.0210, -79.5200],
  "302":[8.9744, -79.5115],
  "303":[9.0310, -79.5010],
  "304":[8.9590, -79.5460],
  "305":[9.0650, -79.6820],  // Canal de Panamá
  "306":[9.5620, -78.9830],  // San Blas
  "307":[9.1100, -79.6700],  // Parque Soberanía
  "308":[8.9520, -79.5338],  // Casco Viejo
  "309":[8.8080, -82.5400],  // Volcán Barú
  "310":[8.9960, -79.5180],
  "311":[9.0088, -79.5090],
  "312":[8.9523, -79.5345],
  "313":[9.0200, -79.5100],
  "314":[8.9940, -79.5170],
  "315":[9.0031, -79.5255],
  "316":[9.0144, -79.5085],
  "317":[8.9883, -79.5032],
  "318":[9.0200, -79.5060],
  "319":[8.9935, -79.5145],
  "320":[9.0060, -79.5270],
  "321":[9.0120, -79.5340],
  "322":[9.0245, -79.5180],
  "323":[9.0015, -79.5300],
  "324":[9.0068, -79.5220]
};

// ── Estado del mapa ──
let _map            = null;   // instancia Leaflet
let _mapMarkers     = {};     // { bizId: L.marker }
let _mapActiveCat   = '';     // categoría filtrada
let _mapSelectedId  = null;   // id negocio seleccionado
let _mapInitialized = false;

// ── Entrada principal ──
function initMap() {
  // Si ya está inicializado solo actualizar tamaño y redibuja filtros
  if (_mapInitialized) {
    _map.invalidateSize();
    _filterAndRenderMap();
    return;
  }
  _mapInitialized = true;

  // Detectar modo oscuro para tiles
  const dark = document.documentElement.getAttribute('data-theme') === 'dark';

  _map = L.map('mapCanvas', {
    center: [9.0, -79.52],
    zoom: 13,
    zoomControl: false
  });

  // Tiles — CartoDB claro/oscuro (sin API key)
  const tileUrl = dark
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';

  L.tileLayer(tileUrl, {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | © <a href="https://carto.com">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19
  }).addTo(_map);

  // Zoom control en esquina superior derecha
  L.control.zoom({ position: 'topright' }).addTo(_map);

  // Chips de categoría
  _buildMapCatFilters();

  // Marcadores
  _placeAllMarkers();

  // Panel lateral
  _filterAndRenderMap();

  // Cierra popup al click en mapa vacío
  _map.on('click', () => closeMapPopup());
}

// ── Cambia tiles cuando cambia el tema ──
document.addEventListener('themeChanged', () => {
  if (!_mapInitialized || !_map) return;
  _map.eachLayer(l => { if (l._url) _map.removeLayer(l); });
  const dark = document.documentElement.getAttribute('data-theme') === 'dark';
  L.tileLayer(
    dark
      ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
      : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    { attribution: '© OpenStreetMap | © CARTO', subdomains: 'abcd', maxZoom: 19 }
  ).addTo(_map);
});

// ── Chips de filtro por categoría ──
function _buildMapCatFilters() {
  const wrap = document.getElementById('mapCatFilters');
  if (!wrap) return;

  // Chip "Todos"
  const all = _chipEl('Todos', '', _mapActiveCat === '');
  all.onclick = () => _setMapCat('');
  wrap.appendChild(all);

  // Una chip por categoría que tenga negocios con coords
  const usedCats = new Set(
    BUSINESSES
      .filter(b => BIZ_COORDS[b.id])
      .map(b => b.categoryId)
  );

  CATEGORIES.forEach(cat => {
    if (!usedCats.has(cat.id)) return;
    const chip = _chipEl(cat.label, cat.id, false);
    chip.style.setProperty('--chip-color', cat.color);
    chip.onclick = () => _setMapCat(cat.id);
    wrap.appendChild(chip);
  });
}

function _chipEl(label, catId, active) {
  const el = document.createElement('button');
  el.className = 'map-filter-chip' + (active ? ' active' : '');
  el.dataset.catId = catId;
  el.textContent = label;
  return el;
}

function _setMapCat(catId) {
  _mapActiveCat = catId;
  // Actualizar chips
  document.querySelectorAll('.map-filter-chip').forEach(chip => {
    chip.classList.toggle('active', chip.dataset.catId === catId);
  });
  _filterAndRenderMap();
}

// ── Coloca todos los marcadores en el mapa ──
function _placeAllMarkers() {
  BUSINESSES.forEach(biz => {
    const coords = BIZ_COORDS[biz.id];
    if (!coords) return;

    const cat = CATEGORIES.find(c => c.id === biz.categoryId);
    const color = cat ? cat.color : '#67B8B4';

    const icon = L.divIcon({
      className: '',
      html: `<div class="map-marker" style="background:${color}">
               <div class="map-marker-inner">${_catEmoji(biz.categoryId)}</div>
             </div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -34]
    });

    const marker = L.marker(coords, { icon })
      .addTo(_map)
      .on('click', () => _selectBiz(biz));

    _mapMarkers[biz.id] = marker;
  });
}

// ── Emoji por categoría ──
function _catEmoji(catId) {
  const map = {
    restaurantes: '🍽️',
    salud:        '❤️',
    belleza:      '💄',
    transporte:   '🚗',
    turismo:      '✈️',
    hogar:        '🏠',
    tecnologia:   '💻',
    ropa:         '👗',
    deportes:     '⚽'
  };
  return map[catId] || '📍';
}

// ── Filtra marcadores visibles y actualiza panel + badge ──
function _filterAndRenderMap() {
  const q = (document.getElementById('mapSearch')?.value || '').toLowerCase().trim();

  const visible = BUSINESSES.filter(b => {
    if (!BIZ_COORDS[b.id]) return false;
    if (_mapActiveCat && b.categoryId !== _mapActiveCat) return false;
    if (q && !b.name.toLowerCase().includes(q) && !b.category.toLowerCase().includes(q) && !b.address.toLowerCase().includes(q)) return false;
    return true;
  });

  // Mostrar/ocultar marcadores
  Object.entries(_mapMarkers).forEach(([id, marker]) => {
    const show = visible.some(b => b.id === id);
    if (show) {
      if (!_map.hasLayer(marker)) marker.addTo(_map);
    } else {
      if (_map.hasLayer(marker)) _map.removeLayer(marker);
    }
  });

  // Badge
  const badge = document.getElementById('mapCount');
  if (badge) badge.textContent = `${visible.length} negocio${visible.length !== 1 ? 's' : ''}`;

  // Clear button en buscador
  const clearBtn = document.getElementById('mapClear');
  if (clearBtn) clearBtn.classList.toggle('hide', !q);

  // Panel lateral
  _renderMapPanel(visible);
}

// ── Panel lateral de resultados ──
function _renderMapPanel(list) {
  const container = document.getElementById('mapPanelList');
  const panel     = document.getElementById('mapPanel');
  if (!container) return;

  if (!list.length) {
    container.innerHTML = `<div style="padding:24px 16px;text-align:center;color:var(--muted);font-size:.875rem">
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin:0 auto 12px;display:block;opacity:.35"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
      Sin resultados para esta búsqueda
    </div>`;
    if (panel) panel.classList.remove('hidden');
    return;
  }

  container.innerHTML = list.map(b => {
    const cat   = CATEGORIES.find(c => c.id === b.categoryId);
    const color = cat ? cat.color : '#67B8B4';
    const stars = `<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="#F4D35E" stroke="#F4D35E" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
    const isSelected = _mapSelectedId === b.id;
    return `<div class="map-list-card${isSelected ? ' selected' : ''}" onclick="javascript:_selectBiz(BUSINESSES.find(x=>x.id==='${b.id}'))" data-map-card="${b.id}">
      <img class="map-list-img" src="${b.image}" alt="${b.name}" onerror="this.src='https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=56&h=56&fit=crop'">
      <div class="map-list-body">
        <div class="map-list-name">${b.name}</div>
        <div class="map-list-cat" style="color:${color}">${b.category}</div>
        <div class="map-list-addr">${b.address}</div>
        <div class="map-list-rating">${stars} ${b.rating} <span style="color:var(--muted);font-weight:400">(${b.reviews})</span></div>
      </div>
    </div>`;
  }).join('');

  if (panel) panel.classList.remove('hidden');
}

// ── Seleccionar un negocio (click en marcador o card) ──
function _selectBiz(biz) {
  if (!biz) return;

  // Deseleccionar anterior
  if (_mapSelectedId && _mapMarkers[_mapSelectedId]) {
    _mapMarkers[_mapSelectedId].getElement()?.querySelector('.map-marker')?.classList.remove('selected');
  }

  _mapSelectedId = biz.id;

  // Resaltar marcador seleccionado
  const markerEl = _mapMarkers[biz.id]?.getElement()?.querySelector('.map-marker');
  if (markerEl) markerEl.classList.add('selected');

  // Centrar mapa
  const coords = BIZ_COORDS[biz.id];
  if (coords) _map.panTo(coords, { animate: true });

  // Resaltar card en panel
  document.querySelectorAll('.map-list-card').forEach(el => {
    el.classList.toggle('selected', el.dataset.mapCard === biz.id);
  });

  // Scroll panel al card
  const card = document.querySelector(`[data-map-card="${biz.id}"]`);
  card?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  // Abrir popup
  _openMapPopup(biz);
}

// ── Popup flotante ──
function _openMapPopup(biz) {
  const cat   = CATEGORIES.find(c => c.id === biz.categoryId);
  const color = cat ? cat.color : '#67B8B4';
  const stars = starsHTML(biz.rating);

  document.getElementById('mpImg').src   = biz.image;
  document.getElementById('mpImg').alt   = biz.name;
  document.getElementById('mpCat').textContent    = biz.category;
  document.getElementById('mpCat').style.color    = color;
  document.getElementById('mpName').textContent   = biz.name;
  document.getElementById('mpAddrText').textContent = biz.address;

  const ratingEl = document.getElementById('mpRating');
  ratingEl.innerHTML = `${stars}
    <strong style="margin-left:4px">${biz.rating}</strong>
    <span style="font-weight:400;color:var(--muted)">(${biz.reviews} reseñas)</span>`;

  // Botón "Ver detalle"
  const btnDetail = document.getElementById('mpBtnDetail');
  btnDetail.onclick = () => { closeMapPopup(); openModal(biz.id); };

  // Botón Google Maps
  const btnGmaps = document.getElementById('mpBtnGmaps');
  btnGmaps.href = `https://www.google.com/maps/search/?api=1&query=${biz.mapQuery || encodeURIComponent(biz.address)}`;

  // Teléfono rápido si existe
  let phoneHtml = '';
  if (biz.phone) {
    phoneHtml = `<a href="tel:${biz.phone}" class="map-popup-btn map-popup-btn-phone" style="flex:0 0 auto;padding:9px 12px;border-radius:12px;background:rgba(16,185,129,.1);color:#10B981;border:none;cursor:pointer;display:flex;align-items:center;gap:5px;font-size:.8rem;font-weight:600;font-family:'Poppins',sans-serif;text-decoration:none">
      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.09 6.09l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
      Llamar
    </a>`;
  }

  // Inyectar botón de llamada si no existe
  const actionsEl = document.querySelector('.map-popup-actions');
  if (actionsEl) {
    const existingPhone = actionsEl.querySelector('.map-popup-btn-phone');
    if (existingPhone) existingPhone.remove();
    if (biz.phone) actionsEl.insertAdjacentHTML('beforeend', phoneHtml);
  }

  // Deal badge
  const dealBadge = document.getElementById('mpDeal');
  if (dealBadge) {
    if (biz.deal) {
      dealBadge.textContent  = biz.deal.label;
      dealBadge.style.background = biz.deal.color;
      dealBadge.style.display    = 'inline-block';
    } else {
      dealBadge.style.display = 'none';
    }
  }

  document.getElementById('mapBizPopup').classList.add('visible');
}

function closeMapPopup() {
  document.getElementById('mapBizPopup')?.classList.remove('visible');
  if (_mapSelectedId && _mapMarkers[_mapSelectedId]) {
    _mapMarkers[_mapSelectedId].getElement()?.querySelector('.map-marker')?.classList.remove('selected');
  }
  _mapSelectedId = null;
  document.querySelectorAll('.map-list-card').forEach(el => el.classList.remove('selected'));
}

function closeMapPanel() {
  document.getElementById('mapPanel')?.classList.add('hidden');
}

function filterMapMarkers() {
  _filterAndRenderMap();
}

function clearMapSearch() {
  const input = document.getElementById('mapSearch');
  if (input) input.value = '';
  _filterAndRenderMap();
}

// Reinicializar mapa cuando se cambia el tema (para tiles)
const _origToggleDark = typeof toggleDarkMode === 'function' ? toggleDarkMode : null;
if (_origToggleDark) {
  // El evento 'themeChanged' se dispara desde toggleDarkMode si lo emitimos
  const _realToggle = toggleDarkMode;
  window.toggleDarkMode = function() {
    _realToggle();
    document.dispatchEvent(new Event('themeChanged'));
  };
}


/* ================================================================
   GLOBO TERRÁQUEO FYNDER — versión completa con texturas reales,
   shader día/noche, nubes, arcos tipo tubo, labels flotantes,
   tarjetas orbitantes, ticker y controles de zoom.
   Panamá 🇵🇦 destacado como hub principal.
   ================================================================ */
(function () {
  'use strict';

  let _globeReady = false;

  /* Se llama desde initMap() */
  window.initGlobe = function () {
    if (_globeReady) return;
    if (typeof THREE === 'undefined') {
      setTimeout(window.initGlobe, 300);
      return;
    }
    _globeReady = true;
    _bootGlobe();
  };

  function _bootGlobe() {
    const wrap        = document.getElementById('globe-wrap');
    const canvas      = document.getElementById('globeCanvas');
    const loaderEl    = document.getElementById('globe-loader');
    const loaderText  = document.getElementById('globe-loader-text');
    const labelsLayer = document.getElementById('globe-labels-layer');
    const tooltip     = document.getElementById('globe-city-tooltip');
    const ttName      = document.getElementById('gTtName');
    const ttInfo      = document.getElementById('gTtInfo');
    if (!wrap || !canvas) return;

    /* ── Loading manager ── */
    const manager = new THREE.LoadingManager();
    manager.onProgress = (url, loaded, total) => {
      if (loaderText) loaderText.textContent =
        'Iniciando red global… ' + Math.round(loaded / total * 100) + '%';
    };
    manager.onLoad = () => {
      if (loaderEl) loaderEl.classList.add('hidden');
      _startCountUp();
    };
    const texLoader = new THREE.TextureLoader(manager);

    /* ── Escena ── */
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, wrap.clientWidth / wrap.clientHeight, 0.1, 2000);
    const BASE_Z = 285;
    camera.position.set(0, 0, BASE_Z);
    const baseCameraPos = camera.position.clone();

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setSize(wrap.clientWidth, wrap.clientHeight);

    const RADIUS = 100;

    /* ── Estrellas ── */
    const starCount = 1400;
    const starGeo   = new THREE.BufferGeometry();
    const starPos   = new Float32Array(starCount * 3);
    const starCol   = new Float32Array(starCount * 3);
    const palette   = [[1,1,1],[.75,.85,1],[1,.9,.75],[.9,.7,1]];
    for (let i = 0; i < starCount; i++) {
      const r  = 560 + Math.random() * 440;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(Math.random() * 2 - 1);
      starPos[i*3]   = r * Math.sin(ph) * Math.cos(th);
      starPos[i*3+1] = r * Math.sin(ph) * Math.sin(th);
      starPos[i*3+2] = r * Math.cos(ph);
      const c = palette[Math.floor(Math.random() * palette.length)];
      starCol[i*3] = c[0]; starCol[i*3+1] = c[1]; starCol[i*3+2] = c[2];
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute('color',    new THREE.BufferAttribute(starCol, 3));
    const starField = new THREE.Points(starGeo, new THREE.PointsMaterial({
      size: 1.4, vertexColors: true, transparent: true, opacity: 0.86, sizeAttenuation: true
    }));
    scene.add(starField);

    /* ── Grupo globo ── */
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    /* Texturas */
    const dayTex   = texLoader.load('https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg');
    const nightTex = texLoader.load('https://threejs.org/examples/textures/planets/earth_lights_2048.png');
    const cloudTex = texLoader.load('https://threejs.org/examples/textures/planets/earth_clouds_1024.png');

    /* Textura de glow generada en canvas */
    function _makeGlowTex() {
      const sz = 128, cv = document.createElement('canvas');
      cv.width = sz; cv.height = sz;
      const ctx = cv.getContext('2d');
      const g = ctx.createRadialGradient(sz/2,sz/2,0,sz/2,sz/2,sz/2);
      g.addColorStop(0,   'rgba(255,255,255,1)');
      g.addColorStop(.25, 'rgba(255,255,255,.55)');
      g.addColorStop(1,   'rgba(255,255,255,0)');
      ctx.fillStyle = g; ctx.fillRect(0,0,sz,sz);
      return new THREE.CanvasTexture(cv);
    }
    const glowTex = _makeGlowTex();

    /* ── Sol ── */
    let sunAngle = Math.atan2(0.8, 0.6);
    const sunDir = new THREE.Vector3(0.6, 0.35, 0.8).normalize();
    const sunDirLive = new THREE.Vector3();
    const sunSprite = new THREE.Sprite(new THREE.SpriteMaterial({
      map: glowTex, color: 0xfff0c4, transparent: true,
      blending: THREE.AdditiveBlending, depthWrite: false
    }));
    sunSprite.scale.set(195, 195, 1);
    scene.add(sunSprite);

    /* ── Shader Tierra día/noche ── */
    const earthMat = new THREE.ShaderMaterial({
      uniforms: {
        dayTexture:   { value: dayTex },
        nightTexture: { value: nightTex },
        sunDirection: { value: sunDir.clone() }
      },
      vertexShader: `
        varying vec2 vUv; varying vec3 vWorldNormal;
        void main(){
          vUv = uv;
          vWorldNormal = normalize(mat3(modelMatrix)*normal);
          gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0);
        }`,
      fragmentShader: `
        uniform sampler2D dayTexture,nightTexture;
        uniform vec3 sunDirection;
        varying vec2 vUv; varying vec3 vWorldNormal;
        void main(){
          vec3 day   = texture2D(dayTexture,  vUv).rgb;
          vec3 night = texture2D(nightTexture,vUv).rgb;
          float intensity = dot(normalize(vWorldNormal),normalize(sunDirection));
          float mix1 = smoothstep(-0.25,0.35,intensity);
          vec3 color = mix(night*1.6, day*0.95, mix1);
          float band = 1.0 - smoothstep(0.0,0.4,abs(intensity));
          color += vec3(1.0,0.45,0.15)*band*0.35;
          gl_FragColor = vec4(color,1.0);
        }`
    });
    globeGroup.add(new THREE.Mesh(new THREE.SphereGeometry(RADIUS, 96, 96), earthMat));

    /* ── Nubes ── */
    const cloudMesh = new THREE.Mesh(
      new THREE.SphereGeometry(RADIUS + 1.5, 64, 64),
      new THREE.MeshBasicMaterial({
        map: cloudTex, transparent: true, opacity: 0.36,
        blending: THREE.AdditiveBlending, depthWrite: false
      })
    );
    globeGroup.add(cloudMesh);

    /* ── Atmósfera glow ── */
    globeGroup.add(new THREE.Mesh(
      new THREE.SphereGeometry(RADIUS + 6, 64, 64),
      new THREE.ShaderMaterial({
        uniforms: { glowColor: { value: new THREE.Color(0x34d399) } },
        vertexShader: `
          varying vec3 vNormal;
          void main(){ vNormal=normalize(normalMatrix*normal);
            gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
        fragmentShader: `
          varying vec3 vNormal; uniform vec3 glowColor;
          void main(){
            float intensity=pow(0.55-dot(vNormal,vec3(0,0,1)),2.5);
            gl_FragColor=vec4(glowColor,clamp(intensity,0.0,1.0)*0.9); }`,
        blending: THREE.AdditiveBlending, side: THREE.BackSide, transparent: true
      })
    ));

    /* ── Helper lat/lon → Vector3 ── */
    function ll2v(lat, lon, r) {
      const phi   = (90 - lat)  * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      return new THREE.Vector3(
        -r * Math.sin(phi) * Math.cos(theta),
         r * Math.cos(phi),
         r * Math.sin(phi) * Math.sin(theta)
      );
    }

    /* ── Ciudades ── */
    const cityData = [
      { name:'Nueva York',       lat:40.7,   lon:-74.0,   label:true,  info:'Hub financiero global' },
      { name:'Londres',          lat:51.5,   lon:-0.1,    label:true,  info:'Capital europea de negocios' },
      { name:'Lagos',            lat:6.5,    lon:3.4,     label:false, info:'Mayor ciudad de África' },
      { name:'El Cairo',         lat:30.0,   lon:31.2,    label:false, info:'Ciudad milenaria de Egipto' },
      { name:'Dubái',            lat:25.2,   lon:55.3,    label:true,  info:'Centro comercial de Oriente Medio' },
      { name:'Bombay',           lat:19.1,   lon:72.9,    label:false, info:'Capital financiera de India' },
      { name:'Singapur',         lat:1.35,   lon:103.8,   label:false, info:'Centro tecnológico de Asia' },
      { name:'Tokio',            lat:35.7,   lon:139.7,   label:true,  info:'Metrópolis más grande del mundo' },
      { name:'Sídney',           lat:-33.9,  lon:151.2,   label:false, info:'Principal ciudad de Oceanía' },
      { name:'Los Ángeles',      lat:34.0,   lon:-118.2,  label:false, info:'Capital del entretenimiento' },
      { name:'São Paulo',        lat:-23.5,  lon:-46.6,   label:true,  info:'Motor económico de Latinoamérica' },
      { name:'Ciudad de México', lat:19.4,   lon:-99.1,   label:false, info:'Capital de México' },
      { name:'Bogotá',           lat:4.7,    lon:-74.1,   label:false, info:'Capital de Colombia' },
      { name:'Lima',             lat:-12.0,  lon:-77.0,   label:false, info:'Capital de Perú' },
      { name:'Buenos Aires',     lat:-34.6,  lon:-58.4,   label:false, info:'Capital de Argentina' },
      { name:'Madrid',           lat:40.4,   lon:-3.7,    label:false, info:'Capital de España' },
      { name:'Nairobi',          lat:-1.3,   lon:36.8,    label:false, info:'Capital de Kenia' },
      { name:'Toronto',          lat:43.7,   lon:-79.4,   label:false, info:'Mayor ciudad de Canadá' },
      { name:'Moscú',            lat:55.75,  lon:37.6,    label:false, info:'Capital de Rusia' },
      { name:'Shanghái',         lat:31.2,   lon:121.5,   label:false, info:'Hub financiero de China' },
      { name:'Panamá',           lat:8.98,   lon:-79.52,  label:true,  highlight:true, info:'🇵🇦 Hub logístico de las Américas · Fynder HQ' },
    ];

    const markerGeo   = new THREE.SphereGeometry(1.1, 10, 10);
    const markerWorld = [];

    const cities = cityData.map(c => {
      const pos   = ll2v(c.lat, c.lon, RADIUS + 1.2);
      const color = c.highlight ? 0xff5c5c : 0xffc773;
      const mesh  = new THREE.Mesh(markerGeo, new THREE.MeshBasicMaterial({ color }));
      mesh.position.copy(pos);
      mesh.scale.setScalar(c.highlight ? 1.9 : 1);
      globeGroup.add(mesh);

      const halo = new THREE.Sprite(new THREE.SpriteMaterial({
        map: glowTex, color, transparent: true,
        blending: THREE.AdditiveBlending, depthWrite: false
      }));
      halo.scale.setScalar(c.highlight ? 22 : 11);
      halo.position.copy(pos);
      globeGroup.add(halo);

      let ring = null;
      if (c.highlight) {
        ring = new THREE.Mesh(
          new THREE.RingGeometry(1, 1.35, 40),
          new THREE.MeshBasicMaterial({ color: 0xffd166, transparent: true, opacity: 0.8,
            side: THREE.DoubleSide, blending: THREE.AdditiveBlending })
        );
        ring.position.copy(pos);
        ring.lookAt(0, 0, 0);
        globeGroup.add(ring);
      }

      let labelEl = null;
      if (c.label) {
        labelEl = document.createElement('div');
        labelEl.className = c.highlight ? 'globe-city-label globe-highlight-label' : 'globe-city-label';
        const flag = c.highlight ? '🇵🇦 ' : '';
        labelEl.innerHTML = `<span class="globe-city-ring"></span><span class="globe-city-name">${flag}${c.name}</span>`;
        if (labelsLayer) labelsLayer.appendChild(labelEl);
      }

      markerWorld.push({ mesh, city: c });
      return { ...c, mesh, halo, ring, ringT: Math.random(), labelEl, phase: Math.random() * Math.PI * 2 };
    });

    /* ── Arcos tipo tubo ── */
    const arcPairs = [
      ['Nueva York',      'Londres'],
      ['Londres',         'El Cairo'],
      ['El Cairo',        'Dubái'],
      ['Dubái',           'Bombay'],
      ['Bombay',          'Singapur'],
      ['Singapur',        'Tokio'],
      ['Tokio',           'Los Ángeles'],
      ['Los Ángeles',     'Panamá'],
      ['Panamá',          'Nueva York'],
      ['Panamá',          'São Paulo'],
      ['São Paulo',       'Lagos'],
      ['Lagos',           'Londres'],
      ['Panamá',          'Ciudad de México'],
      ['Panamá',          'Bogotá'],
      ['São Paulo',       'Buenos Aires'],
      ['Ciudad de México','Los Ángeles'],
    ];

    function _findCity(name) { return cities.find(c => c.name === name); }
    const trailGeo = new THREE.SphereGeometry(1.0, 8, 8);
    const arcs = [];

    arcPairs.forEach(([a, b]) => {
      const fc = _findCity(a);
      const tc = _findCity(b);
      if (!fc || !tc) return;
      const start = fc.mesh.position.clone();
      const end   = tc.mesh.position.clone();
      const mid   = start.clone().add(end).multiplyScalar(0.5);
      mid.setLength(RADIUS + 1 + start.distanceTo(end) * 0.42);
      const curve   = new THREE.QuadraticBezierCurve3(start, mid, end);
      const tubeGeo = new THREE.TubeGeometry(curve, 64, 0.35, 6, false);
      const isPanama = a === 'Panamá' || b === 'Panamá';
      const tubeMat  = new THREE.MeshBasicMaterial({
        color: isPanama ? 0xffd166 : 0x9fe6c9,
        transparent: true, opacity: isPanama ? 0.55 : 0.38,
        blending: THREE.AdditiveBlending
      });
      globeGroup.add(new THREE.Mesh(tubeGeo, tubeMat));
      const trailMeshes = [];
      for (let i = 0; i < 5; i++) {
        const m = new THREE.Mesh(trailGeo, new THREE.MeshBasicMaterial({
          color: 0xffffff, transparent: true, opacity: 1 - i / 5,
          blending: THREE.AdditiveBlending
        }));
        m.scale.setScalar(1 - i * 0.14);
        globeGroup.add(m);
        trailMeshes.push(m);
      }
      arcs.push({ curve, trailMeshes, t: Math.random(), speed: 0.0028 + Math.random() * 0.0016 });
    });

    /* ── Interacción: drag + inercia + zoom ── */
    let isDragging = false, prevX = 0, prevY = 0;
    let velX = 0.0015;
    let targetZ = BASE_Z;
    const MIN_Z = 170, MAX_Z = 420;
    const AUTO_SPEED = 0.0014;
    let pointerNormX = 0, pointerNormY = 0;

    wrap.addEventListener('pointerdown', e => {
      isDragging = true; prevX = e.clientX; prevY = e.clientY;
      _checkCityClick(e);
    });
    window.addEventListener('pointerup', () => { isDragging = false; });
    window.addEventListener('pointermove', e => {
      pointerNormX = (e.clientX / window.innerWidth)  * 2 - 1;
      pointerNormY = (e.clientY / window.innerHeight) * 2 - 1;
      if (!isDragging) return;
      const dx = e.clientX - prevX, dy = e.clientY - prevY;
      globeGroup.rotation.y += dx * 0.005;
      globeGroup.rotation.x += dy * 0.003;
      globeGroup.rotation.x = Math.max(-0.9, Math.min(0.9, globeGroup.rotation.x));
      velX = dx * 0.0006;
      prevX = e.clientX; prevY = e.clientY;
    });

    wrap.addEventListener('wheel', e => {
      e.preventDefault();
      targetZ = Math.max(MIN_Z, Math.min(MAX_Z, targetZ + e.deltaY * 0.22));
    }, { passive: false });

    let lastPinch = 0;
    wrap.addEventListener('touchstart', e => {
      if (e.touches.length === 2)
        lastPinch = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
    }, { passive: true });
    wrap.addEventListener('touchmove', e => {
      if (e.touches.length === 2) {
        const d = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
        targetZ = Math.max(MIN_Z, Math.min(MAX_Z, targetZ - (d - lastPinch) * 0.6));
        lastPinch = d;
      }
    }, { passive: true });

    const btnIn  = document.getElementById('gBtnZoomIn');
    const btnOut = document.getElementById('gBtnZoomOut');
    const btnRst = document.getElementById('gBtnReset');
    if (btnIn)  btnIn.addEventListener('click',  () => { targetZ = Math.max(MIN_Z, targetZ - 30); });
    if (btnOut) btnOut.addEventListener('click', () => { targetZ = Math.min(MAX_Z, targetZ + 30); });
    if (btnRst) btnRst.addEventListener('click', () => {
      targetZ = BASE_Z;
      globeGroup.rotation.x = 0;
      velX = 0.0015;
      if (tooltip) tooltip.style.opacity = '0';
    });

    window.addEventListener('resize', () => {
      const w = wrap.clientWidth, h = wrap.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });

    /* ── Raycaster para click en ciudades ── */
    const raycaster = new THREE.Raycaster();
    const mouse     = new THREE.Vector2();
    let   ttTimeout = null;

    function _checkCityClick(e) {
      const rect = canvas.getBoundingClientRect();
      mouse.x =  ((e.clientX - rect.left) / rect.width)  * 2 - 1;
      mouse.y = -((e.clientY - rect.top)  / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(markerWorld.map(m => m.mesh));
      if (hits.length) {
        const hit = markerWorld.find(m => m.mesh === hits[0].object);
        if (hit) _showTooltip(e.clientX, e.clientY, hit.city);
      } else {
        _hideTooltip();
      }
    }

    function _showTooltip(x, y, city) {
      if (!tooltip) return;
      if (ttName) ttName.textContent = city.name;
      if (ttInfo) ttInfo.textContent = city.info || '';
      tooltip.style.left    = (x + 14) + 'px';
      tooltip.style.top     = (y - 10) + 'px';
      tooltip.style.opacity = '1';
      clearTimeout(ttTimeout);
      ttTimeout = setTimeout(_hideTooltip, 3200);
    }

    function _hideTooltip() {
      if (tooltip) tooltip.style.opacity = '0';
    }

    /* ── Count-up del número de negocios ── */
    function _startCountUp() {
      const el = document.getElementById('gStatNumber');
      if (!el) return;
      const target   = parseInt(el.textContent) || 85;
      const duration = 1600;
      const t0 = performance.now();
      function tick(now) {
        const p = Math.min(1, (now - t0) / duration);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }

    /* ── Ticker ── */
    const tickerItems = [
      'Nuevo negocio en <b>Panamá City</b> · hace 2s',
      'Cliente conectado desde <b>Bogotá</b> · hace 5s',
      'Negocio guardado en <b>Ciudad de México</b> · hace 9s',
      'Nueva reseña en <b>São Paulo</b> · hace 14s',
      'Emprendedor registrado en <b>Lima</b> · hace 18s',
      'Búsqueda desde <b>Madrid</b> · hace 24s',
      'Venta confirmada en <b>Buenos Aires</b> · hace 29s',
      'Nuevo usuario en <b>Toronto</b> · hace 33s',
      '🇵🇦 Negocio destacado en <b>Panamá</b> · hace 37s',
      'Cliente conectado desde <b>Tokio</b> · hace 41s',
    ];
    const track = document.getElementById('globe-ticker-track');
    if (track) {
      const full = tickerItems.concat(tickerItems);
      track.innerHTML = full.map(t => `<span class="globe-ticker-item">● ${t}</span>`).join('');
    }

    /* ── Tarjetas orbitantes ── */
    const orbitCards = [
      { el: document.getElementById('gCardLeft'),  angle: Math.PI * 0.78, speed: 0.10,  rx: 0.47, ry: 0.40, dir:  1 },
      { el: document.getElementById('gCardRight'), angle:-Math.PI * 0.22, speed: 0.075, rx: 0.45, ry: 0.36, dir: -1 },
      { el: document.getElementById('gCardSmall'), angle: Math.PI * 0.12, speed: 0.13,  rx: 0.40, ry: 0.42, dir:  1 },
    ];

    function _updateOrbitCards(delta) {
      const cx = wrap.clientWidth / 2, cy = wrap.clientHeight / 2;
      const min = Math.min(wrap.clientWidth, wrap.clientHeight);
      orbitCards.forEach(o => {
        if (!o.el) return;
        o.angle += o.dir * o.speed * delta;
        const x = cx + Math.cos(o.angle) * min * o.rx;
        const y = cy + Math.sin(o.angle) * min * o.ry;
        o.el.style.left      = x + 'px';
        o.el.style.top       = y + 'px';
        o.el.style.transform = 'translate(-50%,-50%)';
      });
    }
    _updateOrbitCards(0);

    /* ── Labels flotantes ── */
    const tmpVec    = new THREE.Vector3();
    const tmpNormal = new THREE.Vector3();
    const camDir    = new THREE.Vector3();

    function _updateLabels() {
      cities.forEach(c => {
        if (!c.labelEl) return;
        c.mesh.getWorldPosition(tmpVec);
        tmpNormal.copy(tmpVec).normalize();
        camDir.copy(camera.position).sub(tmpVec).normalize();
        const facing  = tmpNormal.dot(camDir);
        const opacity = Math.max(0, Math.min(1, (facing + 0.05) / 0.35));
        const proj    = tmpVec.clone().project(camera);
        const x = (proj.x * 0.5 + 0.5) * wrap.clientWidth;
        const y = (-proj.y * 0.5 + 0.5) * wrap.clientHeight;
        c.labelEl.style.left    = x + 'px';
        c.labelEl.style.top     = (y - 10) + 'px';
        c.labelEl.style.opacity = opacity.toFixed(2);
      });
    }

    /* ── Loop de animación ── */
    const clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.05);
      const t     = clock.getElapsedTime();

      /* Auto-rotación + inercia */
      if (!isDragging) {
        globeGroup.rotation.y += AUTO_SPEED + velX;
        velX *= 0.94;
      }

      /* Zoom suave */
      camera.position.z += (targetZ - camera.position.z) * 0.08;

      /* Sol orbita */
      sunAngle += delta * 0.01;
      sunDirLive.set(Math.cos(sunAngle), 0.35, Math.sin(sunAngle)).normalize();
      earthMat.uniforms.sunDirection.value.copy(sunDirLive);
      sunSprite.position.copy(sunDirLive).multiplyScalar(480);

      /* Nubes giran lento */
      cloudMesh.rotation.y += 0.00018;

      /* Pulso de marcadores */
      cities.forEach(c => {
        const base = c.highlight ? 1.9 : 1;
        const s    = base * (1 + Math.sin(t * 2 + c.phase) * 0.18);
        c.mesh.scale.setScalar(s);
        c.halo.scale.setScalar((c.highlight ? 22 : 11) * (1 + Math.sin(t * 1.6 + c.phase) * 0.15));
        if (c.ring) {
          c.ringT += delta * 0.4;
          if (c.ringT > 1) c.ringT = 0;
          const sc = 1 + c.ringT * 2.2;
          c.ring.scale.setScalar(sc);
          c.ring.material.opacity = 0.8 * (1 - c.ringT);
        }
      });

      /* Cometas en arcos */
      arcs.forEach(arc => {
        arc.t += arc.speed;
        if (arc.t > 1.15) arc.t = -0.15;
        arc.trailMeshes.forEach((m, i) => {
          const tt = arc.t - i * 0.028;
          if (tt < 0 || tt > 1) { m.visible = false; return; }
          m.visible = true;
          m.position.copy(arc.curve.getPoint(tt));
        });
      });

      /* Estrellas derivan lento */
      starField.rotation.y += 0.00006;

      /* Paralaje de cámara con el mouse */
      camera.position.x = baseCameraPos.x + pointerNormX * 12;
      camera.position.y = baseCameraPos.y - pointerNormY * 8;
      camera.lookAt(0, 0, 0);

      _updateOrbitCards(delta);
      _updateLabels();
      renderer.render(scene, camera);
    }

    animate();

  } // fin _bootGlobe

  /* ── Hook a initMap ── */
  const _prevInitMap = window.initMap;
  window.initMap = function () {
    if (typeof _prevInitMap === 'function') _prevInitMap();
    requestAnimationFrame(() => requestAnimationFrame(window.initGlobe));
  };

}()); // fin IIFE


/* ================================================================
   SISTEMA DE MENSAJES – FYNDER
   ================================================================ */

// ---- Storage helpers ----
function _getMsgs(bizId) {
  try { return JSON.parse(localStorage.getItem('fynderChat_' + bizId) || '[]'); }
  catch(e) { return []; }
}
function _saveMsgs(bizId, msgs) {
  localStorage.setItem('fynderChat_' + bizId, JSON.stringify(msgs));
}
function _getConversations() {
  try { return JSON.parse(localStorage.getItem('fynderConversations') || '[]'); }
  catch(e) { return []; }
}
function _saveConversations(list) {
  localStorage.setItem('fynderConversations', JSON.stringify(list));
}
function _getBookmarks() {
  try { return JSON.parse(localStorage.getItem('fynderMsgBookmarks') || '[]'); }
  catch(e) { return []; }
}
function _saveBookmarks(list) {
  localStorage.setItem('fynderMsgBookmarks', JSON.stringify(list));
}

// ---- Estado activo del chat ----
let _activeChatBizId = null;

// ---- Abrir chat desde el modal del negocio ----
function openChatFromModal() {
  const logged = !!localStorage.getItem('fynderLogged');
  if (!logged) { showToast('Inicia sesión para enviar mensajes'); closeModalDirect(); goPage('login'); return; }
  const id = modalBusinessId; // variable global del modal existente
  if (!id) return;
  const biz = BUSINESSES.find(b => String(b.id) === String(id));
  if (!biz) return;
  closeModalDirect();
  openChat(id, biz);
}

// ---- Abrir chat con un negocio ----
function openChat(bizId, biz) {
  _activeChatBizId = String(bizId);

  // Cerrar el panel de info si estaba abierto (nuevo chat seleccionado)
  closeWaChatInfoPanel();

  // Asegurar que la conversación existe
  let convs = _getConversations();
  if (!convs.find(c => String(c.id) === String(bizId))) {
    convs.unshift({ id: String(bizId), name: biz.name, cat: biz.category, image: biz.image || null, unread: 0, lastMsg: '', lastTime: '' });
    _saveConversations(convs);
  }

  // Helper: rellena los elementos de header por ID
  function _fillHeader(nameId, subId, avaId, onlineId) {
    const nameEl   = document.getElementById(nameId);
    const subEl    = document.getElementById(subId);
    const avaEl    = document.getElementById(avaId);
    const onlineEl = document.getElementById(onlineId);
    if (nameEl) nameEl.textContent = biz.name;
    if (subEl)  { subEl.textContent = 'en línea'; subEl.classList.add('online'); }
    if (onlineEl) onlineEl.classList.add('visible');
    if (avaEl) {
      if (biz.image) {
        avaEl.innerHTML = `<img src="${biz.image}" alt="${biz.name}" loading="lazy">`;
        avaEl.style.background = '';
      } else {
        avaEl.innerHTML = '';
        avaEl.textContent = (biz.name || '?')[0].toUpperCase();
        avaEl.style.background = _avatarColor(biz.name);
      }
    }
  }

  // Rellena header del área desktop (wa-chat-area) y del page-chat móvil
  _fillHeader('chatHeaderName','chatHeaderSub','chatHeaderAvatar','chatHeaderOnline');
  _fillHeader('chatHeaderNameMobile','chatHeaderSubMobile','chatHeaderAvatarMobile','chatHeaderOnlineMobile');

  // Botón llamar desktop
  const callBtn = document.getElementById('waChatCallBtn');
  if (callBtn) {
    callBtn.onclick = biz.phone
      ? () => { window.location.href = 'tel:' + biz.phone.replace(/\s/g,''); }
      : () => showToast('Teléfono no disponible');
  }

  // Si no tiene mensajes, agregar mensaje de bienvenida
  let msgs = _getMsgs(bizId);
  if (msgs.length === 0) {
    const welcomeMsg = {
      id: Date.now(), from: 'biz',
      text: `¡Hola! 👋 Bienvenido a ${biz.name}. ¿En qué podemos ayudarte?`,
      time: _fmtTime(new Date()), date: _fmtDate(new Date())
    };
    msgs = [welcomeMsg];
    _saveMsgs(bizId, msgs);
    _updateConvLastMsg(bizId, welcomeMsg.text, welcomeMsg.time);
    pushNotification({ type:'chat', title:biz.name,
      body: welcomeMsg.text.slice(0,80)+(welcomeMsg.text.length>80?'…':''),
      bizId:biz.id, image:biz.image||null });
  }

  const isDesktop = window.innerWidth >= 769;
  if (isDesktop) {
    // Layout WA Web: mostrar wa-chat-area dentro de page-messages
    const welcome  = document.getElementById('waWelcome');
    const chatArea = document.getElementById('waChatArea');
    if (welcome)  welcome.style.display  = 'none';
    if (chatArea) chatArea.style.display = 'flex';
    goPage('messages'); renderConversations();
    renderChatMessages(bizId);   // renderiza en #chatMessages (desktop)
    // Marcar activo en la lista
    document.querySelectorAll('.msg-chat-item').forEach(el => el.classList.remove('wa-active'));
    const activeItem = document.querySelector(`.msg-chat-item[data-biz-id="${bizId}"]`);
    if (activeItem) activeItem.classList.add('wa-active');
  } else {
    // Móvil: renderiza en #chatMessagesMobile y navega a page-chat
    renderChatMessagesMobile(bizId);
    goPage('chat');
  }

  // Simular que el negocio lee los mensajes al abrir el chat
  setTimeout(() => {
    const allMsgs = _getMsgs(bizId);
    let changed = false;
    allMsgs.forEach(m => {
      if (m.from === 'user' && m.status !== 'read') {
        m.status = 'read';
        m.read   = true;
        changed  = true;
      }
    });
    if (changed) {
      _saveMsgs(bizId, allMsgs);
      if (_activeChatBizId === bizId) {
        if (window.innerWidth >= 769) renderChatMessages(bizId);
        else renderChatMessagesMobile(bizId);
      }
    }
  }, 1200);

  // Aplicar ajustes guardados
  _loadMsgSettings();
  if (_msgSettings.bubbleColor) _applyChatBubbleColor(_msgSettings.bubbleColor);
  if (_msgSettings.fontSize)    _applyChatFontSize(_msgSettings.fontSize);

  // Resetear input y mostrar botón mic (en caso de que quedara texto de un chat anterior)
  const chatInput = document.getElementById('chatInput');
  if (chatInput) { chatInput.value = ''; }
  chatInputChange();
}

// ---- Renderizar mensajes (desktop: #chatMessages) ----
function renderChatMessages(bizId) {
  const container = document.getElementById('chatMessages');
  _renderMsgsInto(container, bizId);
}

// ---- Renderizar mensajes (móvil: #chatMessagesMobile) ----
function renderChatMessagesMobile(bizId) {
  const container = document.getElementById('chatMessagesMobile');
  _renderMsgsInto(container, bizId);
}

// ---- Renderizador compartido ----
function _renderMsgsInto(container, bizId) {
  if (!container) return;
  const msgs = _getMsgs(bizId);

  let html = '';
  let prevDate = '';
  let prevFrom = '';

  msgs.forEach((msg, i) => {
    const isOut = (msg.from === 'user');
    const isIn  = !isOut;

    if (msg.date && msg.date !== prevDate) {
      html += `<div class="chat-date-sep">${msg.date}</div>`;
      prevDate = msg.date;
    }

    const nextMsg  = msgs[i + 1];
    const isLastInGroup  = !nextMsg  || nextMsg.from  !== msg.from;
    const isFirstInGroup = prevFrom !== msg.from;

    const biz = BUSINESSES.find(b => String(b.id) === String(bizId));
    const bizInitial = biz ? (biz.name || '?')[0].toUpperCase() : '?';
    const bizAvaHtml = biz && biz.image ? `<img src="${biz.image}" alt="">` : bizInitial;
    const bizAvaBg   = biz ? _avatarColor(biz.name) : '#4a4d55';

    let avaHtml = '';
    if (isIn) {
      avaHtml = isFirstInGroup
        ? `<div class="chat-msg-ava" style="${biz && !biz.image ? 'background:'+bizAvaBg : ''}">${bizAvaHtml}</div>`
        : `<div class="chat-msg-ava" style="visibility:hidden"></div>`;
    }

    let bubbleClass = 'chat-bubble';
    if (isIn  && isLastInGroup) bubbleClass += ' chat-bubble-tail-in';
    if (!isIn && isLastInGroup) bubbleClass += ' chat-bubble-tail-out';

    const ticks = isOut ? _buildTickHtml(msg) : '';

    html += `
      <div class="${isIn ? 'chat-msg-row in' : 'chat-msg-row out'}">
        ${isIn ? avaHtml : ''}
        <div>
          <div class="${bubbleClass}">
            ${escapeHtml(msg.text)}
            <div class="chat-bubble-meta">
              <span class="chat-bubble-time">${msg.time || ''}</span>
              ${ticks}
            </div>
          </div>
        </div>
      </div>`;
    prevFrom = msg.from;
  });

  container.innerHTML = html;
  requestAnimationFrame(() => { container.scrollTop = container.scrollHeight; });
}

// ---- Enviar mensaje (desktop: #chatInput) ----
function sendChatMessage() {
  _doSendMessage('chatInput', _activeChatBizId, renderChatMessages);
}

// ---- Enviar mensaje (móvil: #chatInputMobile) ----
function sendChatMessageMobile() {
  _doSendMessage('chatInputMobile', _activeChatBizId, renderChatMessagesMobile);
}

function _doSendMessage(inputId, bizId, renderFn) {
  const input = document.getElementById(inputId);
  if (!input || !bizId) return;
  const text = input.value.trim();
  if (!text) return;

  if (!localStorage.getItem('fynderLogged')) {
    showToast('Inicia sesión para enviar mensajes'); return;
  }

  const now = new Date();
  // status: 'pending' → 'sent' → 'delivered' → 'read'
  const msg = { id: Date.now(), from: 'user', text,
    time: _fmtTime(now), date: _fmtDate(now), read: false, status: 'pending' };

  const msgs = _getMsgs(bizId);
  msgs.push(msg);
  _saveMsgs(bizId, msgs);
  _updateConvLastMsg(bizId, text, msg.time);
  renderConversations();

  input.value = '';
  chatInputChange(); // restaurar botón mic después de enviar
  renderFn(bizId);

  // Simular progresión de estados: pending → sent → delivered → read
  setTimeout(() => _advanceMsgStatus(bizId, msg.id, 'sent',      renderFn), 400);
  setTimeout(() => _advanceMsgStatus(bizId, msg.id, 'delivered', renderFn), 900);
  setTimeout(() => _advanceMsgStatus(bizId, msg.id, 'read',      renderFn), 2200);
  setTimeout(() => _bizAutoReply(bizId, renderFn), 1400);
}

/** Avanza el estado de un mensaje y re-renderiza */
function _advanceMsgStatus(bizId, msgId, newStatus, renderFn) {
  const msgs = _getMsgs(bizId);
  const m = msgs.find(x => x.id === msgId);
  if (!m) return;
  m.status = newStatus;
  if (newStatus === 'read') m.read = true;
  _saveMsgs(bizId, msgs);
  if (_activeChatBizId === bizId && renderFn) renderFn(bizId);
}

// ---- Respuesta automática del negocio ----
function _bizAutoReply(bizId, renderFn) {
  if (_activeChatBizId !== bizId) return;

  // Marcar todos los mensajes del usuario como 'read' (el negocio los leyó)
  const msgs = _getMsgs(bizId);
  let changed = false;
  msgs.forEach(m => {
    if (m.from === 'user' && m.status !== 'read') {
      m.status = 'read';
      m.read   = true;
      changed  = true;
    }
  });

  // Obtener el último mensaje del usuario para responder con contexto
  const userMsgs = msgs.filter(m => m.from === 'user');
  const lastUserText = userMsgs.length > 0
    ? (userMsgs[userMsgs.length - 1].text || '').toLowerCase()
    : '';

  const biz = BUSINESSES.find(b => String(b.id) === String(bizId));
  const cat = biz ? (biz.categoryId || biz.category || '').toLowerCase() : '';
  const bizName = biz ? biz.name : 'nosotros';

  const text = _getSmartReply(lastUserText, cat, bizName, biz);
  const now  = new Date();
  const reply = { id: Date.now(), from: 'biz', text, time: _fmtTime(now), date: _fmtDate(now) };
  msgs.push(reply);
  _saveMsgs(bizId, msgs);
  _updateConvLastMsg(bizId, text, reply.time);
  renderConversations();
  // Usa la función de render pasada, o detecta cuál aplica
  if (renderFn) {
    renderFn(bizId);
  } else {
    if (window.innerWidth >= 769) renderChatMessages(bizId);
    else renderChatMessagesMobile(bizId);
  }
}

// ---- Renderizar lista de conversaciones ----
function renderConversations() {
  const convs = _getConversations();
  const list  = document.getElementById('msgChatList');
  const empty = document.getElementById('msgEmptyChats');
  if (!list) return;

  if (convs.length === 0) {
    list.innerHTML = '';
    if (empty) empty.classList.remove('hide');
    return;
  }
  if (empty) empty.classList.add('hide');

  list.innerHTML = convs.map(c => {
    const initial = (c.name || '?')[0].toUpperCase();
    const bg      = _avatarColor(c.name);
    const avatar  = c.image
      ? `<img src="${c.image}" alt="${c.name}" loading="lazy">`
      : `<span style="color:#fff;font-size:1.1rem;font-weight:700;font-family:'Poppins',sans-serif">${initial}</span>`;
    const unread  = c.unread > 0 ? `<span class="msg-chat-unread">${c.unread}</span>` : '';
    const isActive = String(c.id) === String(_activeChatBizId);
    return `
      <div class="msg-chat-item${isActive ? ' wa-active' : ''}" data-biz-id="${c.id}" onclick="openChatById('${c.id}')">
        <div class="msg-chat-avatar-wrap">
          <div class="msg-chat-avatar" style="background:${bg}">${avatar}</div>
          <span class="msg-chat-online"></span>
        </div>
        <div class="msg-chat-body">
          <div class="msg-chat-top">
            <span class="msg-chat-name">${escapeHtml(c.name)}</span>
            <span class="msg-chat-time">${c.lastTime || ''}</span>
          </div>
          <span class="msg-chat-preview">${escapeHtml(c.lastMsg || 'Toca para ver el chat')}</span>
        </div>
        <div class="msg-chat-actions">
          ${unread}
          <button class="msg-chat-menu" onclick="event.stopPropagation();msgConvMenu('${c.id}')" title="Más opciones">
            <i class="fas fa-ellipsis-vertical"></i>
          </button>
        </div>
      </div>`;
  }).join('');
}

// ---- Abrir chat por ID ----
function openChatById(bizId) {
  const biz = BUSINESSES.find(b => String(b.id) === String(bizId));
  let convs = _getConversations();
  const conv = convs.find(c => String(c.id) === String(bizId));
  if (conv) { conv.unread = 0; _saveConversations(convs); }
  updateMsgBadge();
  // Limpiar notificaciones de este negocio al abrir el chat
  clearNotifsByBizId(bizId);

  if (biz) {
    openChat(bizId, biz);
  } else {
    // Negocio no encontrado — mostrar igualmente
    _activeChatBizId = String(bizId);
    const isDesktop = window.innerWidth >= 769;

    function _fill(nameId, subId, avaId) {
      const nameEl = document.getElementById(nameId);
      const subEl  = document.getElementById(subId);
      const avaEl  = document.getElementById(avaId);
      if (nameEl) nameEl.textContent = conv ? conv.name : 'Negocio';
      if (subEl)  subEl.textContent  = conv ? (conv.cat || 'Negocio local') : 'Negocio local';
      if (avaEl)  {
        avaEl.innerHTML = '';
        avaEl.textContent = (conv ? conv.name : 'N')[0].toUpperCase();
        avaEl.style.background = _avatarColor(conv ? conv.name : 'N');
      }
    }

    if (isDesktop) {
      _fill('chatHeaderName','chatHeaderSub','chatHeaderAvatar');
      const welcome  = document.getElementById('waWelcome');
      const chatArea = document.getElementById('waChatArea');
      if (welcome)  welcome.style.display  = 'none';
      if (chatArea) chatArea.style.display = 'flex';
      renderChatMessages(bizId);
      document.querySelectorAll('.msg-chat-item').forEach(el => el.classList.remove('wa-active'));
      const activeItem = document.querySelector(`.msg-chat-item[data-biz-id="${bizId}"]`);
      if (activeItem) activeItem.classList.add('wa-active');
    } else {
      _fill('chatHeaderNameMobile','chatHeaderSubMobile','chatHeaderAvatarMobile');
      renderChatMessagesMobile(bizId);
      goPage('chat');
    }
  }
}

// ---- Menú contextual de conversación ----
function msgConvMenu(bizId) {
  const bmarks = _getBookmarks();
  const isBookmarked = bmarks.includes(String(bizId));
  const action1 = isBookmarked ? 'Quitar de marcadores' : 'Añadir a marcadores';
  const icon1   = isBookmarked ? 'fa-bookmark-slash' : 'fa-bookmark';
  showToast(`${action1}… (próximamente)`);
}

// ---- Tab switch ----
function msgSwitchTab(tab) {
  // Limpiar búsqueda al cambiar de tab
  _convSearchQuery = '';
  const searchInput = document.getElementById('msgSearchInput');
  if (searchInput) searchInput.value = '';

  // Actualizar botones
  document.getElementById('msgTabChats')    .classList.toggle('active', tab === 'chats');
  document.getElementById('msgTabBookmarks').classList.toggle('active', tab === 'bookmarks');
  const tabNotif = document.getElementById('msgTabNotif');
  if (tabNotif) tabNotif.classList.remove('active');

  // Mostrar panel
  document.getElementById('msgPanelChats')    .classList.toggle('active', tab === 'chats');
  document.getElementById('msgPanelBookmarks').classList.toggle('active', tab === 'bookmarks');
  document.getElementById('msgPanelNotif')    .classList.remove('active');

  if (tab === 'chats')     renderConversations();
  if (tab === 'bookmarks') renderBookmarks();
}

function msgSwitchSection(section) {
  // Botón "Notificaciones" en el header
  document.getElementById('msgPanelChats')    .classList.remove('active');
  document.getElementById('msgPanelBookmarks').classList.remove('active');
  document.getElementById('msgPanelNotif')    .classList.toggle('active', section === 'notif');
  document.getElementById('msgTabChats')    .classList.remove('active');
  document.getElementById('msgTabBookmarks').classList.remove('active');
  const tabNotif = document.getElementById('msgTabNotif');
  if (tabNotif) tabNotif.classList.toggle('active', section === 'notif');
  if (section === 'notif') renderNotifications();
}

// ---- Marcadores ----
function renderBookmarks() {
  const bmarks = _getBookmarks();
  const list   = document.getElementById('msgBookmarkList');
  const empty  = document.getElementById('msgEmptyBookmarks');
  if (!list) return;

  if (bmarks.length === 0) {
    list.innerHTML = '';
    if (empty) empty.style.display = 'flex';
    return;
  }
  if (empty) empty.style.display = 'none';

  const convs = _getConversations();
  list.innerHTML = bmarks.map(id => {
    const c = convs.find(x => String(x.id) === String(id));
    if (!c) return '';
    const initial = (c.name || '?')[0].toUpperCase();
    const bg      = _avatarColor(c.name);
    const avatar  = c.image
      ? `<img src="${c.image}" alt="${c.name}" loading="lazy">`
      : `<span style="color:#fff;font-size:1.1rem;font-weight:700">${initial}</span>`;
    return `
      <div class="msg-chat-item" onclick="openChatById('${c.id}')">
        <div class="msg-chat-avatar-wrap">
          <div class="msg-chat-avatar" style="background:${bg}">${avatar}</div>
        </div>
        <div class="msg-chat-body">
          <div class="msg-chat-top">
            <span class="msg-chat-name">${escapeHtml(c.name)}</span>
            <span class="msg-chat-time">${c.lastTime || ''}</span>
          </div>
          <span class="msg-chat-preview">${escapeHtml(c.lastMsg || '')}</span>
        </div>
      </div>`;
  }).join('');
}

// ---- Notificaciones — sistema real ----

const NOTIF_KEY = 'fynderNotifications';

/** Carga todas las notificaciones guardadas en localStorage */
function _getNotifications() {
  try { return JSON.parse(localStorage.getItem(NOTIF_KEY)) || []; }
  catch { return []; }
}

/** Guarda la lista de notificaciones */
function _saveNotifications(list) {
  localStorage.setItem(NOTIF_KEY, JSON.stringify(list));
}

/**
 * Agrega una nueva notificación al almacén.
 * @param {Object} opts - { type, title, body, icon, bizId, image }
 */
function pushNotification({ type = 'info', title, body, icon = '🔔', bizId = null, image = null } = {}) {
  const notifs = _getNotifications();
  notifs.unshift({
    id:    Date.now() + Math.random(),
    type,          // 'welcome'|'fav'|'chat'|'promo'|'info'
    title,
    body,
    icon,
    bizId,
    image,
    ts:    Date.now(),
    read:  false
  });
  // Máximo 50 notificaciones
  if (notifs.length > 50) notifs.length = 50;
  _saveNotifications(notifs);
  updateNotifBadge();

  // Dispara notificación nativa del navegador si el permiso está concedido
  if (Notification.permission === 'granted' && _msgSettings.notif) {
    try {
      new Notification(title, {
        body,
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        tag: String(bizId || type)
      });
    } catch (e) { /* Safari puede lanzar en algunos contextos */ }
  }
}

/** Elimina todas las notificaciones de un negocio específico */
function clearNotifsByBizId(bizId) {
  const notifs = _getNotifications().filter(n => String(n.bizId) !== String(bizId));
  _saveNotifications(notifs);
  updateNotifBadge();
  // Si el tab de notificaciones está visible, re-renderizar
  const tabNotif = document.getElementById('msgTabNotif');
  if (tabNotif && tabNotif.classList.contains('active')) renderNotifications();
}

/** Marca todas las notificaciones como leídas */
function markAllNotifsRead() {
  const notifs = _getNotifications().map(n => ({ ...n, read: true }));
  _saveNotifications(notifs);
  updateNotifBadge();
}

/** Marca una notificación individual como leída */
function markNotifRead(id) {
  const notifs = _getNotifications().map(n => n.id === id ? { ...n, read: true } : n);
  _saveNotifications(notifs);
  updateNotifBadge();
}

/** Elimina una notificación */
function deleteNotif(id) {
  const notifs = _getNotifications().filter(n => n.id !== id);
  _saveNotifications(notifs);
  renderNotifications();
  updateNotifBadge();
}

/** Actualiza el badge del botón "Notificaciones" en el header de mensajes */
function updateNotifBadge() {
  const unread = _getNotifications().filter(n => !n.read).length;
  // Badge en el tab del header
  const tabBtn = document.getElementById('msgTabNotif');
  if (tabBtn) {
    let dot = tabBtn.querySelector('.msg-notif-dot');
    if (unread > 0) {
      if (!dot) {
        dot = document.createElement('span');
        dot.className = 'msg-notif-dot';
        tabBtn.appendChild(dot);
      }
      dot.textContent = unread > 9 ? '9+' : unread;
    } else {
      if (dot) dot.remove();
    }
  }
}

/** Solicita permiso de notificaciones al navegador */
async function requestNotifPermission() {
  if (!('Notification' in window)) {
    showToast('Tu navegador no soporta notificaciones');
    return;
  }
  if (Notification.permission === 'granted') {
    showToast('¡Las notificaciones ya están activadas!');
    _hideNotifBanner();
    _setNotifBtnActivated();
    return;
  }
  if (Notification.permission === 'denied') {
    showToast('Notificaciones bloqueadas. Actívalas desde la configuración del navegador.');
    return;
  }
  const perm = await Notification.requestPermission();
  if (perm === 'granted') {
    _setNotifBtnActivated();
    showToast('✅ ¡Notificaciones activadas!');
    setTimeout(() => _hideNotifBanner(), 1200);
    pushNotification({
      type: 'welcome',
      title: '¡Bienvenido a Fynder!',
      body: 'Ahora recibirás actualizaciones sobre negocios y ofertas.',
      icon: '🎉'
    });
    renderNotifications();
    settSyncNotif(); // actualiza el estado en ajustes también
  } else {
    showToast('Notificaciones no activadas');
  }
}

/** Marca el botón del banner como "Activado" visualmente */
function _setNotifBtnActivated() {
  const btn = document.getElementById('notifBannerBtn');
  if (btn) {
    btn.innerHTML = '<i class="fas fa-bell"></i> Activado';
    btn.classList.add('activated');
  }
  // Ajustes: actualizar el botón y estado
  const settBtn = document.getElementById('settNotifActivarBtn');
  if (settBtn) {
    settBtn.textContent = '✓ Activado';
    settBtn.style.background = '#10B981';
    settBtn.style.color = '#fff';
    settBtn.style.borderColor = '#10B981';
    settBtn.disabled = true;
  }
}

/** Manejador del botón "Activar" del banner — actualiza UI antes de la promesa */
async function handleNotifBannerClick(btn) {
  if (!('Notification' in window)) {
    showToast('Tu navegador no soporta notificaciones');
    return;
  }
  if (Notification.permission === 'granted') {
    btn.innerHTML = '<i class="fas fa-bell"></i> Activado';
    btn.classList.add('activated');
    showToast('¡Las notificaciones ya están activadas!');
    setTimeout(() => _hideNotifBanner(), 1200);
    return;
  }
  if (Notification.permission === 'denied') {
    showToast('Notificaciones bloqueadas. Actívalas desde la configuración del navegador.');
    return;
  }
  // Mostrar estado de carga
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Activando...';
  btn.disabled = true;
  const perm = await Notification.requestPermission();
  if (perm === 'granted') {
    btn.innerHTML = '<i class="fas fa-bell"></i> Activado';
    btn.classList.add('activated');
    btn.disabled = false;
    showToast('✅ ¡Notificaciones activadas!');
    setTimeout(() => _hideNotifBanner(), 1500);
    pushNotification({
      type: 'welcome',
      title: '¡Bienvenido a Fynder!',
      body: 'Ahora recibirás actualizaciones sobre negocios y ofertas.',
      icon: '🎉'
    });
    renderNotifications();
    settSyncNotif();
  } else {
    btn.innerHTML = '<i class="fas fa-bell-slash"></i> Bloqueado';
    btn.style.background = '#EF4444';
    btn.disabled = false;
    showToast('Notificaciones no activadas');
  }
}

function _hideNotifBanner() {
  const banner = document.querySelector('.msg-notif-banner');
  if (banner) banner.style.display = 'none';
}

/* ── Modal de ajustes administrados por la organización ── */
function showOrgInfoModal() {
  const modal = document.getElementById('orgInfoModal');
  if (modal) modal.classList.add('open');
}
function closeOrgInfoModal() {
  const modal = document.getElementById('orgInfoModal');
  if (modal) modal.classList.remove('open');
}
// Cerrar con Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeOrgInfoModal();
});

/** Formatea una fecha para las notificaciones (relativa al presente real) */
function _fmtNotifDate(ts) {
  const diff = Date.now() - ts;
  const min  = Math.floor(diff / 60000);
  const hrs  = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (min < 1)   return 'Ahora mismo';
  if (min < 60)  return `Hace ${min} min`;
  if (hrs < 24)  return `Hace ${hrs} h`;
  if (days < 7)  return `Hace ${days} día${days > 1 ? 's' : ''}`;
  return new Date(ts).toLocaleDateString('es', { day: 'numeric', month: 'short' });
}

/** Ícono por tipo de notificación */
function _notifTypeIcon(type) {
  const map = {
    welcome: '🎉',
    fav:     '❤️',
    chat:    '💬',
    promo:   '🏷️',
    info:    '📢'
  };
  return map[type] || '🔔';
}

function renderNotifications() {
  const list = document.getElementById('msgNotifList');
  if (!list) return;

  // Actualizar visibilidad del banner según permiso
  const banner = document.querySelector('.msg-notif-banner');
  if (banner) {
    const shouldShow = !('Notification' in window) || Notification.permission !== 'granted';
    banner.style.display = shouldShow ? 'flex' : 'none';
  }

  const notifs = _getNotifications();

  if (notifs.length === 0) {
    list.innerHTML = `
      <div class="msg-empty" style="display:flex">
        <div class="msg-empty-icon"><i class="fas fa-bell-slash"></i></div>
        <p class="msg-empty-title">Sin notificaciones</p>
        <p class="msg-empty-sub">Cuando haya novedades de negocios o tus actividades, aparecerán aquí.</p>
      </div>`;
    return;
  }

  // Cabecera con "Marcar todas como leídas"
  const unread = notifs.filter(n => !n.read).length;
  const header = unread > 0
    ? `<div class="msg-notif-actions-row">
         <span class="msg-notif-count">${unread} sin leer</span>
         <button class="msg-notif-markall" onclick="markAllNotifsRead();renderNotifications()">
           <i class="fas fa-check-double"></i> Marcar todas
         </button>
       </div>`
    : '';

  list.innerHTML = header + notifs.map(n => {
    const icon = n.image
      ? `<img class="msg-notif-card-img" src="${n.image}" alt="${n.title}" loading="lazy">`
      : `<div class="msg-notif-card-emoji">${_notifTypeIcon(n.type)}</div>`;

    const action = n.bizId
      ? `<button class="msg-notif-card-btn"
           onclick="event.stopPropagation();deleteNotif(${n.id});openChatById('${n.bizId}')">
           Ver más
         </button>`
      : '';

    return `
      <div class="msg-notif-card${n.read ? ' msg-notif-card--read' : ''}"
           onclick="deleteNotif(${n.id})${n.bizId ? `;openChatById('${n.bizId}')` : ''}">
        ${icon}
        <div class="msg-notif-card-body">
          <div class="msg-notif-card-header">
            <p class="msg-notif-card-title">${escapeHtml(n.title)}</p>
            <button class="msg-notif-card-del" title="Eliminar"
              onclick="event.stopPropagation();deleteNotif(${n.id})">
              <i class="fas fa-xmark"></i>
            </button>
          </div>
          <p class="msg-notif-card-date">${_fmtNotifDate(n.ts)}</p>
          <p class="msg-notif-card-desc">${escapeHtml(n.body)}</p>
          ${action}
        </div>
      </div>`;
  }).join('');
}

// ---- Badge de mensajes no leídos ----
function updateMsgBadge() {
  const convs  = _getConversations();
  const unread = convs.reduce((s, c) => s + (c.unread || 0), 0);

  // Badge en el nuevo nav-link "Mensajes"
  const badge = document.getElementById('navMsgBadge');
  if (badge) {
    badge.textContent = unread > 9 ? '9+' : unread;
    badge.style.display = unread > 0 ? 'flex' : 'none';
  }

  // Badge en el bottom-nav de la página de mensajes
  const bnavBadge = document.getElementById('msgBnavBadge');
  if (bnavBadge) {
    bnavBadge.textContent = unread > 9 ? '9+' : unread;
    bnavBadge.style.display = unread > 0 ? 'flex' : 'none';
  }
}

// ---- Helpers ----
function _updateConvLastMsg(bizId, text, time) {
  let convs = _getConversations();
  const idx = convs.findIndex(c => String(c.id) === String(bizId));
  if (idx > -1) {
    convs[idx].lastMsg  = text;
    convs[idx].lastTime = time;
    // Mover al principio
    const [conv] = convs.splice(idx, 1);
    convs.unshift(conv);
    _saveConversations(convs);
  }
}
function _fmtTime(d) {
  return d.toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit', hour12: false });
}
function _fmtDate(d) {
  const today = new Date();
  const isToday = d.toDateString() === today.toDateString();
  if (isToday) return 'Hoy';
  const yesterday = new Date(today); yesterday.setDate(today.getDate() - 1);
  if (d.toDateString() === yesterday.toDateString()) return 'Ayer';
  return d.toLocaleDateString('es', { day: 'numeric', month: 'short' });
}
function _fmtRelativeDate() {
  const now = new Date();
  const d   = new Date(now.getFullYear(), now.getMonth(), now.getDate() - Math.floor(Math.random() * 7));
  return _fmtDate(d);
}
function _avatarColor(name) {
  const colors = ['#67B8B4','#2F5BB7','#F97316','#8B5CF6','#EC4899','#10B981','#EF4444','#F4D35E'];
  let hash = 0;
  for (let i = 0; i < (name||'').length; i++) hash = (name||'').charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
}
function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ---- Hook en goPage para inicializar mensajes ----
// La inicialización se hace directamente desde el goPage original modificado arriba
// y desde el DOMContentLoaded abajo.

// ---- Inicialización al cargar ----
document.addEventListener('DOMContentLoaded', () => {
  updateMsgBadge();
  updateNotifBadge();

  // Genera notificaciones de bienvenida la primera vez que el usuario abre la app
  const SEED_KEY = 'fynderNotifSeeded';
  if (!localStorage.getItem(SEED_KEY)) {
    localStorage.setItem(SEED_KEY, '1');
    const promos = BUSINESSES.filter(b => b.isFeatured).slice(0, 3);
    promos.forEach((b, i) => {
      setTimeout(() => {
        pushNotification({
          type:  'promo',
          title: `Novedad de ${b.name}`,
          body:  b.description ? b.description.slice(0, 90) + (b.description.length > 90 ? '…' : '') : '¡Visita su perfil!',
          bizId: b.id,
          image: b.image || null
        });
      }, i * 50); // ligero stagger para timestamps distintos
    });
    // Notificación de bienvenida a Fynder
    setTimeout(() => {
      pushNotification({
        type:  'welcome',
        title: '¡Bienvenido a Fynder!',
        body:  'Descubre negocios locales, guarda tus favoritos y chatea directamente con ellos.',
        icon:  '🎉'
      });
    }, 200);
  }
});


/* ================================================================
   PERFIL DEL NEGOCIO DESDE CHAT
   ================================================================ */

function openChatProfile() {
  if (!_activeChatBizId) return;
  const biz = BUSINESSES.find(b => String(b.id) === String(_activeChatBizId));
  const isDesktop = window.innerWidth >= 769;

  if (isDesktop) {
    // ── Desktop: abrir panel lateral de info ──
    _populateChatInfoPanel(biz);
    const panel = document.getElementById('waChatInfoPanel');
    if (panel) panel.classList.add('open');
    return;
  }

  // ── Móvil: navegar a la página chat-profile ──
  _populateChatProfilePage(biz);
  goPage('chat-profile');
}

/* Rellena el panel lateral de info (desktop) */
function _populateChatInfoPanel(biz) {
  // Avatar
  const avaEl = document.getElementById('waCproAvatar');
  if (avaEl) {
    if (biz && (biz.logo || biz.image)) {
      avaEl.innerHTML = `<img src="${biz.logo || biz.image}" alt="${biz ? biz.name : ''}">`;
      avaEl.style.background = '';
    } else {
      avaEl.innerHTML = '';
      const initial = biz ? (biz.name || '?')[0].toUpperCase() : '?';
      avaEl.textContent = initial;
      avaEl.style.background = _avatarColor(biz ? biz.name : '');
    }
  }
  // Nombre y teléfono
  const nameEl  = document.getElementById('waCproName');
  const phoneEl = document.getElementById('waCproPhone');
  if (nameEl)  nameEl.textContent  = biz ? biz.name  : '—';
  if (phoneEl) phoneEl.textContent = biz && biz.phone ? biz.phone : '';

  // Botón llamar
  const callBtn = document.getElementById('waCproCallBtn');
  if (callBtn) {
    if (biz && biz.phone) {
      callBtn.onclick = () => { window.location.href = 'tel:' + biz.phone.replace(/\s/g,''); };
    } else {
      callBtn.onclick = () => showToast('Teléfono no disponible');
    }
  }

  // Media strip
  const strip   = document.getElementById('waCproMediaStrip');
  const countEl = document.getElementById('waCproMediaCount');
  if (strip) {
    const imgs = [];
    if (biz && biz.logo)  imgs.push(biz.logo);
    if (biz && biz.image) imgs.push(biz.image);
    strip.innerHTML = imgs.map(url =>
      `<img class="cpro-media-thumb" src="${url}" alt="" loading="lazy">`
    ).join('');
    if (countEl) {
      countEl.textContent = imgs.length + ' ›';
      countEl.onclick = openPhotoLightbox;
      countEl.style.cursor = 'pointer';
    }
  }

  // Lista de info
  const infoList = document.getElementById('waCproInfoList');
  if (infoList && biz) {
    infoList.innerHTML = _buildCproInfoRows(biz);
  }
}

/* Rellena la página de perfil (móvil) */
function _populateChatProfilePage(biz) {
  // Título del header
  const titleEl = document.getElementById('cproHeaderTitle');
  if (titleEl) titleEl.textContent = biz ? biz.name : 'Información';

  // Avatar grande
  const avaEl = document.getElementById('cproAvatar');
  if (avaEl) {
    if (biz && (biz.logo || biz.image)) {
      avaEl.innerHTML = `<img src="${biz.logo || biz.image}" alt="${biz ? biz.name : ''}">`;
      avaEl.style.background = '';
    } else {
      avaEl.innerHTML = '';
      const initial = biz ? (biz.name || '?')[0].toUpperCase() : '?';
      avaEl.textContent = initial;
      avaEl.style.background = _avatarColor(biz ? biz.name : '');
    }
  }

  // Nombre y teléfono
  const nameEl  = document.getElementById('cproName');
  const phoneEl = document.getElementById('cproPhone');
  if (nameEl)  nameEl.textContent  = biz ? biz.name  : '—';
  if (phoneEl) phoneEl.textContent = biz && biz.phone ? biz.phone : '';

  // Botón llamar
  const callBtn = document.getElementById('cproCallBtn');
  if (callBtn && biz && biz.phone) {
    callBtn.onclick = () => { window.location.href = 'tel:' + biz.phone.replace(/\s/g,''); };
  } else if (callBtn) {
    callBtn.onclick = () => showToast('Teléfono no disponible');
  }

  // Media strip
  const strip   = document.getElementById('cproMediaStrip');
  const countEl = document.getElementById('cproMediaCount');
  if (strip) {
    const imgs = [];
    if (biz && biz.logo)  imgs.push(biz.logo);
    if (biz && biz.image) imgs.push(biz.image);
    strip.innerHTML = imgs.map(url =>
      `<img class="cpro-media-thumb" src="${url}" alt="" loading="lazy">`
    ).join('');
    if (countEl) {
      countEl.textContent = imgs.length + ' ›';
      countEl.onclick = openPhotoLightbox;
      countEl.style.cursor = 'pointer';
    }
  }

  // Lista de info
  const infoList = document.getElementById('cproInfoList');
  if (infoList && biz) {
    infoList.innerHTML = _buildCproInfoRows(biz);
  }
}

/* Construye las filas de info comunes a ambos destinos */
function _buildCproInfoRows(biz) {
  const rows = [];
  
  // Dirección - hace click para abrir en mapa
  if (biz.address) rows.push({ 
    icon: 'fa-location-dot', 
    title: biz.address, 
    sub: biz.category || '',
    action: `onclick="openChatProfileMap()" style="cursor:pointer"`
  });
  
  // Horario - solo informativo
  if (biz.hours) rows.push({ 
    icon: 'fa-clock', 
    title: biz.hours, 
    sub: 'Horario',
    action: ''
  });
  
  // Teléfono - hace click para llamar
  if (biz.phone) rows.push({ 
    icon: 'fa-phone', 
    title: biz.phone, 
    sub: 'Teléfono',
    action: `onclick="window.location.href='tel:${biz.phone.replace(/\\s/g,'')}'" style="cursor:pointer"`
  });
  
  // Sitio web - hace click para abrir
  if (biz.website) rows.push({ 
    icon: 'fa-globe', 
    title: biz.website, 
    sub: 'Sitio web',
    action: `onclick="window.open('${biz.website.startsWith('http') ? biz.website : 'https://' + biz.website}','_blank')" style="cursor:pointer"`
  });
  
  // Instagram - hace click para abrir
  if (biz.instagram) rows.push({ 
    icon: 'fa-instagram', 
    title: biz.instagram, 
    sub: 'Instagram',
    action: `onclick="window.open('https://instagram.com/${biz.instagram.replace('@','')}','_blank')" style="cursor:pointer"`
  });
  
  // Facebook - hace click para abrir
  if (biz.facebook) rows.push({ 
    icon: 'fa-facebook', 
    title: biz.facebook, 
    sub: 'Facebook',
    action: `onclick="window.open('${biz.facebook.startsWith('http') ? biz.facebook : 'https://facebook.com/' + biz.facebook}','_blank')" style="cursor:pointer"`
  });
  
  // Descripción - solo informativo
  if (biz.description) rows.push({ 
    icon: 'fa-circle-info', 
    title: biz.description, 
    sub: 'Descripción',
    action: ''
  });
  
  // Valoración - hace click para abrir el modal con reseñas
  if (biz.rating) rows.push({ 
    icon: 'fa-star', 
    title: `${biz.rating} ⭐  (${biz.reviews || 0} reseñas)`, 
    sub: 'Valoración',
    action: `onclick="openModal('${biz.id}');setTimeout(()=>document.getElementById('modalTabReviews')?.click(),100)" style="cursor:pointer"`
  });

  return rows.map(r => `
    <div class="cpro-settings-item" ${r.action}>
      <div class="cpro-settings-icon"><i class="fas ${r.icon}"></i></div>
      <div class="cpro-settings-text">
        <span class="cpro-settings-title">${escapeHtml(r.title)}</span>
        ${r.sub ? `<span class="cpro-settings-sub">${escapeHtml(r.sub)}</span>` : ''}
      </div>
      ${r.action ? '<i class="fas fa-chevron-right cpro-settings-arrow"></i>' : ''}
    </div>`).join('');
}

/* Cierra el panel lateral de info */
function closeWaChatInfoPanel() {
  const panel = document.getElementById('waChatInfoPanel');
  if (panel) panel.classList.remove('open');
  closeWaCproMenu(); // Cerrar menú si estaba abierto
}

/* Abre/Cierra el menú contextual del panel lateral */
let _waCproMenuOpen = false;
function toggleWaCproMenu(btn) {
  const menu = document.getElementById('waCproCtxMenu');
  if (!menu) return;
  _waCproMenuOpen = !_waCproMenuOpen;
  menu.style.display = _waCproMenuOpen ? 'flex' : 'none';
}

function closeWaCproMenu() {
  const menu = document.getElementById('waCproCtxMenu');
  if (menu) menu.style.display = 'none';
  _waCproMenuOpen = false;
}

// Cerrar el menú del panel de info al hacer click fuera
document.addEventListener('click', (e) => {
  const menu = document.getElementById('waCproCtxMenu');
  const btn  = document.getElementById('waCproMenuBtn');
  if (!menu || menu.style.display === 'none') return;
  if (btn && btn.contains(e.target)) return;
  if (!menu.contains(e.target)) closeWaCproMenu();
});

function openChatProfileMap() {
  if (!_activeChatBizId) return;
  const biz = BUSINESSES.find(b => String(b.id) === String(_activeChatBizId));
  if (biz && biz.mapQuery) {
    window.open('https://maps.google.com/?q=' + encodeURIComponent(biz.mapQuery), '_blank');
  } else {
    showToast('Ubicación no disponible');
  }
}

function deleteChatHistory() {
  if (!_activeChatBizId) return;
  if (!confirm('¿Borrar todo el historial de este chat?')) return;
  
  localStorage.removeItem('fynderChat_' + _activeChatBizId);
  
  // Actualizar conversación
  let convs = _getConversations();
  const idx = convs.findIndex(c => String(c.id) === String(_activeChatBizId));
  if (idx > -1) { 
    convs[idx].lastMsg = ''; 
    convs[idx].lastTime = ''; 
    _saveConversations(convs); 
  }
  
  showToast('Historial borrado');
  
  // En desktop: recargar mensajes del chat activo
  const isDesktop = window.innerWidth >= 769;
  if (isDesktop) {
    closeWaChatInfoPanel();
    renderChatMessages();
    renderConversations();
  } else {
    goPage('chat');
  }
}

function blockBiz() {
  if (!_activeChatBizId) return;
  
  if (!confirm('¿Bloquear este negocio? Ya no recibirás mensajes.')) return;
  
  // Aquí iría la lógica real de bloqueo (localStorage, etc.)
  let blocked = JSON.parse(localStorage.getItem('fynderBlocked') || '[]');
  if (!blocked.includes(_activeChatBizId)) {
    blocked.push(_activeChatBizId);
    localStorage.setItem('fynderBlocked', JSON.stringify(blocked));
  }
  
  showToast('Negocio bloqueado');
  
  // En desktop: cerrar panel y chat
  const isDesktop = window.innerWidth >= 769;
  if (isDesktop) {
    closeWaChatInfoPanel();
    waCloseChat();
    renderConversations();
  } else {
    goPage('messages');
  }
}


/* ================================================================
   MENÚ CONTEXTUAL DE CHAT (⋮)
   ================================================================ */

let _ctxMenuBizId = null;

function openMsgCtxMenu(bizId, event) {
  if (event) event.stopPropagation();
  _ctxMenuBizId = String(bizId);

  const convs = _getConversations();
  const conv  = convs.find(c => String(c.id) === String(bizId));
  const biz   = BUSINESSES.find(b => String(b.id) === String(bizId));

  // Header del menú
  const ava  = document.getElementById('msgCtxAva');
  const name = document.getElementById('msgCtxName');
  if (ava) {
    const src = (conv && conv.image) || (biz && biz.image) || '';
    const lbl = conv ? conv.name : (biz ? biz.name : '?');
    if (src) {
      ava.innerHTML = `<img src="${src}" alt="">`;
    } else {
      ava.innerHTML = '';
      ava.textContent = lbl[0].toUpperCase();
      ava.style.background = _avatarColor(lbl);
    }
  }
  if (name) name.textContent = conv ? conv.name : (biz ? biz.name : '');

  // Estado de marcador
  const bmarks = _getBookmarks();
  const isBookmarked = bmarks.includes(String(bizId));
  const icon  = document.getElementById('msgCtxBookmarkIcon');
  const label = document.getElementById('msgCtxBookmarkLabel');
  if (icon)  icon.className  = isBookmarked ? 'fas fa-bookmark-slash' : 'fas fa-bookmark';
  if (label) label.textContent = isBookmarked ? 'Quitar de marcadores' : 'Añadir a marcadores';

  document.getElementById('msgCtxOverlay').classList.add('open');
  document.getElementById('msgCtxMenu').classList.add('open');
}

function closeMsgCtxMenu() {
  document.getElementById('msgCtxOverlay').classList.remove('open');
  document.getElementById('msgCtxMenu').classList.remove('open');
}

function toggleMsgBookmark() {
  if (!_ctxMenuBizId) return;
  let bmarks = _getBookmarks();
  const id   = String(_ctxMenuBizId);
  const idx  = bmarks.indexOf(id);
  if (idx > -1) {
    bmarks.splice(idx, 1);
    showToast('Eliminado de marcadores');
  } else {
    bmarks.unshift(id);
    showToast('Añadido a marcadores ⭐');
  }
  _saveBookmarks(bmarks);
  closeMsgCtxMenu();
  renderConversations(); // refrescar lista
}

function msgCtxOpenChat() {
  closeMsgCtxMenu();
  if (_ctxMenuBizId) openChatById(_ctxMenuBizId);
}

function msgCtxViewProfile() {
  closeMsgCtxMenu();
  if (!_ctxMenuBizId) return;
  _activeChatBizId = _ctxMenuBizId;
  openChatProfile();
}

function msgCtxMarkRead() {
  if (!_ctxMenuBizId) return;
  let convs = _getConversations();
  const conv = convs.find(c => String(c.id) === String(_ctxMenuBizId));
  if (conv) { conv.unread = 0; _saveConversations(convs); }
  updateMsgBadge();
  renderConversations();
  showToast('Marcado como leído');
  closeMsgCtxMenu();
}

function msgCtxDeleteChat() {
  if (!_ctxMenuBizId) return;
  closeMsgCtxMenu();
  if (!confirm('¿Eliminar esta conversación?')) return;
  // Borrar mensajes
  localStorage.removeItem('fynderChat_' + _ctxMenuBizId);
  // Quitar de lista de conversaciones
  let convs = _getConversations();
  convs = convs.filter(c => String(c.id) !== String(_ctxMenuBizId));
  _saveConversations(convs);
  // Quitar de marcadores
  let bmarks = _getBookmarks();
  bmarks = bmarks.filter(id => id !== String(_ctxMenuBizId));
  _saveBookmarks(bmarks);
  updateMsgBadge();
  renderConversations();
  showToast('Conversación eliminada');
}

/* Actualizar renderConversations para usar openMsgCtxMenu */
// (Sobreescribe la función anterior con la nueva que pasa bizId al menú)

/** Query activo del buscador de chats — se mantiene entre renders */
let _convSearchQuery = '';

function renderConversations() {
  let convs = _getConversations();
  const list  = document.getElementById('msgChatList');
  const empty = document.getElementById('msgEmptyChats');
  if (!list) return;

  // Aplicar filtro de búsqueda
  if (_convSearchQuery) {
    const q = _convSearchQuery;
    convs = convs.filter(c =>
      (c.name    || '').toLowerCase().includes(q) ||
      (c.lastMsg || '').toLowerCase().includes(q)
    );
  }

  if (convs.length === 0) {
    list.innerHTML = _convSearchQuery
      ? `<div class="msg-search-empty"><i class="fas fa-magnifying-glass"></i><p>Sin resultados para "<b>${escapeHtml(_convSearchQuery)}</b>"</p></div>`
      : '';
    if (empty) {
      if (_convSearchQuery) empty.classList.add('hide');
      else empty.classList.remove('hide');
    }
    return;
  }
  if (empty) empty.classList.add('hide');

  list.innerHTML = convs.map(c => {
    const initial = (c.name || '?')[0].toUpperCase();
    const bg      = _avatarColor(c.name);
    const avatar  = c.image
      ? `<img src="${c.image}" alt="${escapeHtml(c.name)}" loading="lazy">`
      : `<span style="color:#fff;font-size:1rem;font-weight:700;font-family:'Poppins',sans-serif">${initial}</span>`;
    const unread  = c.unread > 0 ? `<span class="msg-chat-unread">${c.unread}</span>` : '';

    // Punto de marcador
    const bmarks = _getBookmarks();
    const starBadge = bmarks.includes(String(c.id))
      ? `<span class="msg-chat-bookmark-dot" title="Marcado"><i class="fas fa-bookmark" style="font-size:.6rem;color:#F4D35E"></i></span>`
      : '';

    // Preview: resaltar término buscado
    let preview = escapeHtml(c.lastMsg || 'Toca para ver el chat');
    if (_convSearchQuery && c.lastMsg) {
      const idx = c.lastMsg.toLowerCase().indexOf(_convSearchQuery);
      if (idx > -1) {
        const raw = escapeHtml(c.lastMsg);
        const esc = escapeHtml(_convSearchQuery);
        preview = raw.replace(new RegExp(esc, 'gi'), m => `<mark class="msg-search-mark">${m}</mark>`);
      }
    }

    return `
      <div class="msg-chat-item" onclick="openChatById('${c.id}')">
        <div class="msg-chat-avatar-wrap">
          <div class="msg-chat-avatar" style="background:${bg}">${avatar}</div>
          <span class="msg-chat-online"></span>
        </div>
        <div class="msg-chat-body">
          <div class="msg-chat-top">
            <span class="msg-chat-name">${escapeHtml(c.name)}${starBadge}</span>
            <span class="msg-chat-time">${c.lastTime || ''}</span>
          </div>
          <span class="msg-chat-preview">${preview}</span>
        </div>
        <div class="msg-chat-actions">
          ${unread}
          <button class="msg-chat-menu" onclick="openMsgCtxMenu('${c.id}', event)" title="Más opciones">
            <i class="fas fa-ellipsis-vertical"></i>
          </button>
        </div>
      </div>`;
  }).join('');
}

/* ================================================================
   EMOJI PICKER
   ================================================================ */

const EMOJI_SKIN_TONES = ['','\uD83C\uDFFB','\uD83C\uDFFC','\uD83C\uDFFD','\uD83C\uDFFE','\uD83C\uDFFF'];
const EMOJI_SKIN_BASE = ['👋','🤚','🖐','✋','🖖','👌','🤏','✌','🤞','🤟','🤘','🤙','👈','👉','👆','🖕','👇','☝','👍','👎','✊','👊','🤛','🤜','�','🦵','🦶','👂','🦻','👃','💅','🤳','👶','🧒','👦','👧','🧑','👱','👨','🧔','👩','🧓','👴','👵','🙍','🙎','🙅','🙆','💁','🙋','🧏','🙇','🤦','🤷','💆','💇','🚶','🧍','🧍','🏃'];
let _emojiSkinTone = 0;
const EMOJI_CATS = [
  { id:'recent',  icon:'🕐', label:'Recientes',  emojis:[] },
  { id:'faces',   icon:'😀', label:'Emoticonos', emojis:['😀','😃','😄','😁','😆','😅','🤣','😂','🙂','🙃','😉','😊','😇','🥰','😍','🤩','😘','😗','☺','😚','😙','🥲','😋','😛','😜','🤪','😝','🤑','🤗','🤭','🤫','🤔','🤐','🤨','😐','😑','😶','😏','😒','🙄','😬','🤥','😌','😔','😪','🤤','😴','😷','🤒','🤕','🤢','🤮','🤧','🥵','🥶','🥴','😵','🤯','🤠','🥳','🥸','😎','🤓','🧐','😕','😟','🙁','☹','😮','😯','😲','😳','🥺','😦','😧','😨','😰','😥','😢','😭','😱','😖','😣','😞','😓','😩','😫','🥱','😤','😡','😠','🤬','😈','👿','💀','☠','💩','🤡','👹','👺','👻','👽','👾','🤖','😺','😸','😹','😻','😼','😽','🙀','😿','😾','🫠','🫡','🫢','🫣','🫤','🫥'] },
  { id:'people',  icon:'🧑', label:'Personas',   emojis:['👋','🤚','🖐','✋','🖖','🫱','🫲','🫳','🫴','👌','🤌','🤏','✌','🤞','🫰','🤟','🤘','🤙','👈','👉','👆','🖕','👇','☝','🫵','👍','👎','✊','👊','🤛','🤜','👏','🙌','🫶','🤲','🤝','🙏','✍','💅','🤳','💪','🦾','🦿','🦵','🦶','👂','🦻','👃','🧠','🫀','🫁','🦷','🦴','👀','👁','👅','👄','🫦','🫂','👶','🧒','👦','👧','🧑','👱','👨','🧔','👩','🧓','👴','👵','🙍','🙍‍♂️','🙍‍♀️','🙎','🙎‍♂️','🙎‍♀️','🙅','🙅‍♂️','🙅‍♀️','🙆','🙆‍♂️','🙆‍♀️','💁','💁‍♂️','💁‍♀️','🙋','🙋‍♂️','🙋‍♀️','🧏','🧏‍♂️','🧏‍♀️','🙇','🙇‍♂️','🙇‍♀️','🤦','🤦‍♂️','🤦‍♀️','🤷','🤷‍♂️','🤷‍♀️','🧑‍⚕️','👨‍⚕️','👩‍⚕️','🧑‍🎓','👨‍🎓','👩‍🎓','🧑‍🏫','👨‍🏫','👩‍🏫','🧑‍⚖️','👨‍⚖️','👩‍⚖️','🧑‍🌾','👨‍🌾','👩‍🌾','🧑‍🍳','👨‍🍳','👩‍🍳','🧑‍🔧','👨‍🔧','👩‍🔧','🧑‍🏭','👨‍🏭','👩‍🏭','🧑‍💼','👨‍💼','👩‍💼','🧑‍🔬','👨‍🔬','👩‍🔬','🧑‍🎨','👨‍🎨','👩‍🎨','🧑‍🚒','👨‍🚒','👩‍🚒','🧑‍✈️','👨‍✈️','👩‍✈️','🧑‍🚀','👨‍🚀','👩‍🚀','🧑‍💻','👨‍💻','👩‍💻','👮','👮‍♂️','👮‍♀️','🕵️','💂','💂‍♂️','💂‍♀️','🥷','👷','👷‍♂️','👷‍♀️','🤴','👸','👰','👰‍♂️','👰‍♀️','🤵','🤵‍♂️','🤵‍♀️','🦸','🦸‍♂️','🦸‍♀️','🦹','🦹‍♂️','🦹‍♀️','🧙','🧙‍♂️','🧙‍♀️','🧝','🧝‍♂️','🧝‍♀️','🧛','🧛‍♂️','🧛‍♀️','🧟','🧟‍♂️','🧟‍♀️','🧞','🧞‍♂️','🧞‍♀️','🧜','🧜‍♂️','🧜‍♀️','🧚','🧚‍♂️','🧚‍♀️','🧌','👼','🎅','🤶','🧑‍🎄','💆','💆‍♂️','💆‍♀️','💇','💇‍♂️','💇‍♀️','🚶','🚶‍♂️','🚶‍♀️','🧍','🧍‍♂️','🧍‍♀️','🧎','🧎‍♂️','🧎‍♀️','🏃','🏃‍♂️','🏃‍♀️','💃','🕺','🕴','👯','👯‍♂️','👯‍♀️','🧖','🧖‍♂️','🧖‍♀️','🧗','🧗‍♂️','🧗‍♀️','🤸','🤸‍♂️','🤸‍♀️','⛹️','⛹️‍♂️','⛹️‍♀️','🤺','🏊','🏊‍♂️','🏊‍♀️','🚴','🚴‍♂️','🚴‍♀️','🏋️','🏋️‍♂️','🏋️‍♀️','🤼','🤼‍♂️','🤼‍♀️','🤽','🤽‍♂️','🤽‍♀️','🤾','🤾‍♂️','🤾‍♀️','🤹','🧘','🧘‍♂️','🧘‍♀️','🛀','🧑‍🤝‍🧑','👫','👬','👭','💑','💏','👨‍👩‍👦','👨‍👩‍👧','👨‍👩‍👧‍👦','👨‍👩‍👦‍👦','👨‍👩‍👧‍👧','👨‍👨‍👦','👩‍👩‍👦','👨‍👧','👨‍👦','👩‍👧','👩‍👦'] },
  { id:'nature',  icon:'🐶', label:'Animales',   emojis:['🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼','🐨','🐯','🦁','🐮','🐷','🐸','🐵','🙈','🙉','🙊','🐒','🐔','🐧','🐦','🐤','🐣','🐥','🦆','🦅','🦉','🦇','🐺','🐗','🐴','🦄','🐝','🪱','🐛','🦋','🐌','🐞','🐜','🪲','🦟','🦗','🪳','🕷','🦂','🐢','🐍','🦎','🦖','🦕','🐙','🦑','🦐','🦞','🦀','🐡','🐠','🐟','🐬','🐳','🐋','🦈','🐊','🐅','🐆','🦓','🦍','🦧','🦣','🐘','🦛','🦏','🐪','🐫','🦒','🦘','🦬','🐃','🐂','🐄','🐎','🐖','🐏','🐑','🦙','🐐','🦌','🐕','🐩','🦮','🐕‍🦺','🐈','🐈‍⬛','🪶','🐓','🦃','🦤','🦚','🦜','🦢','🦩','🕊','🐇','🦝','🦨','🦡','🦫','🦦','🦥','🐁','🐀','🐿','🦔','🌵','🎄','🌲','🌳','🌴','🪵','🌱','🌿','☘','🍀','🎍','🪴','🎋','🍃','🍂','🍁','🍄','🐚','🌾','💐','🌷','🌹','🥀','🪷','🌺','🌸','🌼','🌻','🌞','🌝','🌛','🌜','🌚','🌕','🌖','🌗','🌘','🌑','🌒','🌓','🌔','🌙','🌟','⭐','🌠','🌌','☀','🌤','⛅','🌥','☁','🌦','🌧','⛈','🌩','🌨','❄','☃','⛄','🌬','💨','💧','💦','🫧','🌊','🌫'] },
  { id:'food',    icon:'🍕', label:'Comida',     emojis:['🍕','🍔','🍟','🌭','🍿','🧂','🥓','🥚','🍳','🧇','🥞','🧈','🍞','🥐','🥖','🫓','🥨','🥯','🧀','🥗','🥙','🥪','🌮','🌯','🫔','🧆','🍱','🍘','🍙','🍚','🍛','🍜','🍝','🍠','🍢','🍣','🍤','🍥','🥮','🍡','🥟','🥠','🥡','🦀','🦞','🦐','🦑','🦪','🍦','🍧','🍨','🍩','🍪','🎂','🍰','🧁','🥧','🍫','🍬','🍭','🍮','🍯','🍼','🥛','☕','🫖','🍵','🍶','🍾','🍷','🍸','🍹','🍺','🍻','🥂','🥃','🫗','🥤','🧋','🧃','🧉','🧊','🫙','🍽','🍴','🥄','🔪','🫕','🥘','🍲','🫚','🫛','🌽','🥕','🥦','🥬','🥒','🌶','🫑','🧄','🧅','🥔','🍠','🥐','🥯','🍞','🥖','🫓','🥨','🧀','🥚','🍳','🧇','🥞','🧈','🥓','🥩','🍗','🍖','🌭','🍔','🍟','🍕','🫓','🥪','🥙','🧆','🌮','🌯','🫔','🥗','🥘','🫕','🍲','🍛','🍜','🍝','🍠','🍣','🍱','🥟','🦪','🍤','🍙','🍚','🍘','🍥','🥮','🍢','🧆','🥡'] },
  { id:'travel',  icon:'✈', label:'Viajes',     emojis:['🚗','🚕','🚙','🚌','🚎','🏎','🚓','🚑','🚒','🚐','🛻','🚚','🚛','🚜','🏍','🛵','🛺','🚲','🛴','🛹','🛼','🚏','🛣','🛤','⛽','🚨','🚥','🚦','🛑','🚧','⚓','🛟','⛵','🛶','🚤','🛳','⛴','🛥','🚢','✈','🛩','🛫','🛬','🪂','💺','🚁','🚟','🚠','🚡','🛸','🚀','🛰','🪐','🌍','🌎','🌏','🌐','🗺','🧭','🏔','⛰','🌋','🗻','🏕','🏖','🏜','🏝','🏟','🏛','🏗','🧱','🪨','🪵','🛖','🏘','🏚','🏠','🏡','🏢','🏣','🏤','🏥','🏦','🏨','🏩','🏪','🏫','🏬','🏭','🏯','🏰','💒','🗼','🗽','⛪','🕌','🛕','⛩','🕋','⛲','⛺','🌁','🌃','🌄','🌅','🌆','🌇','🌉','🎠','🎡','🎢','💈','🎪','🎭','🎨','🎬','🎤','🎧','🎼','🎹','🎸','🎺','🎻','🥁','🪘','🪗','🎷','🥁','🎯','⛳','🎣','🤿','🎽','🎿','🛷','🥌','🎱','🎳','🏸','🥊','🥋','🎮','🕹','🎲','🧩','🪀','🪁','🀄','🃏','🎴','🏆','🥇','🥈','🥉','🏅','🎖','🏵','🎗','🎫','🎟'] },
  { id:'objects', icon:'💡', label:'Objetos',    emojis:['⌚','📱','📲','💻','⌨','🖥','🖨','🖱','🖲','💽','💾','💿','📀','🧮','📷','📸','📹','🎥','📽','🎞','📞','☎','📟','📠','📺','📻','🧭','⏱','⏲','⏰','🕰','⌛','⏳','📡','🔋','🪫','🔌','💡','🔦','🕯','🪔','🧯','💰','🪙','💴','💵','💶','💷','💸','💳','📧','📨','📩','📤','📥','📦','📫','📪','📬','📭','📮','🗳','✏','✒','🖋','🖊','📝','📁','📂','🗂','📅','📆','🗒','🗓','📇','📈','📉','📊','📋','📌','📍','🗃','🗄','🗑','🔒','🔓','🔏','🔐','🔑','🗝','🔨','🪓','⛏','⚒','🛠','🗡','⚔','🛡','🪚','🔧','🪛','🔩','⚙','🗜','⚖','🦯','🔗','⛓','🪝','🧲','🪜','⚗','🔭','🔬','🩺','💊','🩹','🩼','🩻','🌡','🪤','🧰','🪣','🧹','🧺','🧻','🧼','🫧','🪥','🧽','🛒','🚪','🛗','🪞','🪟','🛏','🛋','🚽','🪠','🚿','🛁','🪒','🧴','🧷','🧸','🪆','🖼','🪅','🎀','🎊','🎉','🎈','🧧','🎁','🎗','🎟','🎫','🎖','📿','💎','🔮','🪬','🧿','💈','🔭','🔬','🩺','🩻','💉','🩸','💊','🩹','🩼','🌡','🧬','🦠','🧫','🧪','🌡','⚗','🔭','🔬','🕳','💣','🪤','🔫','🗡','⚔','🛡','🪃','🏹','🪚','🔧','🪛','🔩','⚙','🗜','🔗','⛓','🪝','🧲','🪜','🧰','🪤','🪣'] },
  { id:'symbols', icon:'❤', label:'Símbolos',   emojis:['❤','🧡','💛','💚','💙','💜','🖤','🤍','🤎','💔','❣','💕','💞','💓','💗','💖','💘','💝','💟','☮','✝','☪','🪯','🕉','☸','✡','🔯','🕎','☯','☦','🛐','⛎','♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓','🆔','⚛','🉑','☢','☣','📴','📳','🈶','🈚','🈸','🈺','🈷','✴','🆚','💮','🉐','㊙','㊗','🈴','🈵','🈹','🈲','🅰','🅱','🆎','🆑','🅾','🆘','❌','⭕','🛑','⛔','📛','🚫','💯','💢','♨','🚷','🚯','🚳','🚱','🔞','📵','🔇','🔈','🔉','🔊','📣','📢','🔔','🔕','🎵','🎶','⚠','🚸','🔱','⚜','🔰','♻','✅','🆗','🆙','🆒','🆕','🆓','🔟','🔂','🔁','🔀','▶','⏩','⏭','⏯','◀','⏪','⏮','🔼','⏫','🔽','⏬','⏸','⏹','⏺','🔅','🔆','📶','🔣','🔤','🔡','🔢','🔠','💱','💲','⁉','⚡','🌈','🔥','💥','✨','💫','🕳','💤','💢','💬','💭','🗨','🗯','💯'] },
];

let _emojiActiveCat = 0;
let _emojiOpen = false;

function toggleEmojiPicker() {
  _emojiOpen ? closeEmojiPicker() : openEmojiPicker();
}

function openEmojiPicker() {
  _emojiOpen = true;
  // Construir tabs
  const tabsEl = document.getElementById('emojiPickerTabs');
  if (tabsEl && !tabsEl.children.length) {
    tabsEl.innerHTML = EMOJI_CATS.map((cat, i) =>
      `<button class="emoji-tab-btn${i === 0 ? ' active' : ''}" onclick="emojiSelectCat(${i})" title="${cat.label}">${cat.icon}</button>`
    ).join('');
  }
  // Renderizar primera categoría
  renderEmojiCat(_emojiActiveCat);

  document.getElementById('emojiOverlay').classList.add('open');
  document.getElementById('emojiPicker').classList.add('open');
  document.getElementById('emojiSearch').value = '';
  document.getElementById('emojiSearch').focus();
}

function closeEmojiPicker() {
  _emojiOpen = false;
  document.getElementById('emojiOverlay').classList.remove('open');
  document.getElementById('emojiPicker').classList.remove('open');
}

function emojiSelectCat(idx) {
  _emojiActiveCat = idx;
  document.querySelectorAll('.emoji-tab-btn').forEach((b, i) => b.classList.toggle('active', i === idx));
  document.getElementById('emojiSearch').value = '';
  renderEmojiCat(idx);
}

function renderEmojiCat(idx) {
  const grid = document.getElementById('emojiGrid');
  if (!grid) return;
  grid.innerHTML = EMOJI_CATS[idx].emojis.map(e =>
    `<button class="emoji-btn" onclick="insertEmoji('${e}')">${e}</button>`
  ).join('');
}

function filterEmojis() {
  const q    = document.getElementById('emojiSearch').value.toLowerCase().trim();
  const grid = document.getElementById('emojiGrid');
  if (!grid) return;
  if (!q) { renderEmojiCat(_emojiActiveCat); return; }

  // Buscar en todas las categorías
  const allEmojis = EMOJI_CATS.flatMap(cat => cat.emojis);
  const filtered  = allEmojis.filter((e, i, arr) => arr.indexOf(e) === i); // deduplicate
  grid.innerHTML = filtered.map(e =>
    `<button class="emoji-btn" onclick="insertEmoji('${e}')">${e}</button>`
  ).join('');
}

function insertEmoji(emoji) {
  const input = document.getElementById('chatInput');
  if (!input) return;
  const start = input.selectionStart;
  const end   = input.selectionEnd;
  const val   = input.value;
  input.value = val.slice(0, start) + emoji + val.slice(end);
  input.setSelectionRange(start + emoji.length, start + emoji.length);
  input.focus();
  closeEmojiPicker();
}

/* ================================================================
   AJUSTES DE MENSAJES
   ================================================================ */

const _msgSettings = {
  notif:       true,
  sound:       false,
  read:        true,
  online:      true,
  bubbleColor: '#1a5c34',
  fontSize:    'normal',
  wallpaper:   'default'
};

function _loadMsgSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem('fynderMsgSettings') || '{}');
    Object.assign(_msgSettings, saved);
  } catch(e) {}
}
function _saveMsgSettings() {
  localStorage.setItem('fynderMsgSettings', JSON.stringify(_msgSettings));
}

function openMsgSettings() {
  _loadMsgSettings();

  // Sync toggles de notif / sonido / leído
  ['notif','sound','read'].forEach(k => {
    const el = document.getElementById('setting' + k.charAt(0).toUpperCase() + k.slice(1) + 'Toggle');
    if (el) el.classList.toggle('on', _msgSettings[k] !== false);
  });

  // Sync toggle de "en línea"
  const onlineToggle = document.getElementById('settingOnlineToggle');
  if (onlineToggle) onlineToggle.classList.toggle('on', _msgSettings.online !== false);

  // Sync toggle de tema oscuro
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const themeToggle = document.getElementById('settingThemeToggle');
  const themeIcon   = document.getElementById('settingThemeIcon');
  const themeSub    = document.getElementById('settingThemeSub');
  if (themeToggle) themeToggle.classList.toggle('on', isDark);
  if (themeIcon) themeIcon.innerHTML = isDark ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
  if (themeSub) themeSub.textContent = isDark ? 'Tema actual: oscuro' : 'Tema actual: claro';

  // Sync color dots
  document.querySelectorAll('.msg-color-dot').forEach(dot => {
    dot.classList.toggle('active', dot.dataset.color === _msgSettings.bubbleColor);
  });

  // Sync font sub
  const fontLabels = { small:'Pequeño', normal:'Normal', large:'Grande' };
  const fontSubEl = document.getElementById('settingFontSub');
  if (fontSubEl) fontSubEl.textContent = fontLabels[_msgSettings.fontSize] || 'Normal';

  // Sync font buttons
  document.querySelectorAll('.msg-font-btn').forEach((btn, i) => {
    const sizes = ['small','normal','large'];
    btn.classList.toggle('active', sizes[i] === (_msgSettings.fontSize || 'normal'));
  });

  // Sync color sub
  const colorNames = {
    '#67B8B4':'Teal Fynder',
    '#7b3838':'Rojo oscuro',
    '#1e4d7b':'Azul oscuro',
    '#1a5c34':'Verde oscuro',
    '#5b2d82':'Morado',
    '#7a4a1a':'Naranja',
    '#2b5c5c':'Verde azulado'
  };
  const colorSubEl = document.getElementById('settingColorSub');
  if (colorSubEl) colorSubEl.textContent = colorNames[_msgSettings.bubbleColor] || 'Personalizado';

  // Sync wallpaper dots
  const wpNames = {
    default: 'Por defecto',
    dots: 'Patrón de puntos',
    gradient: 'Gradiente',
    dark: 'Oscuro total',
    nature: 'Verde natural'
  };
  document.querySelectorAll('.msg-wallpaper-dot').forEach(dot => {
    dot.classList.toggle('active', dot.dataset.wp === (_msgSettings.wallpaper || 'default'));
  });
  const wpSubEl = document.getElementById('settingWallpaperSub');
  if (wpSubEl) wpSubEl.textContent = wpNames[_msgSettings.wallpaper || 'default'] || 'Por defecto';

  document.getElementById('msgSettingsOverlay').classList.add('open');
  document.getElementById('msgSettingsPanel').classList.add('open');
}

function closeMsgSettings() {
  document.getElementById('msgSettingsOverlay').classList.remove('open');
  document.getElementById('msgSettingsPanel').classList.remove('open');
}

function toggleMsgSetting(key) {
  _loadMsgSettings();
  _msgSettings[key] = !_msgSettings[key];
  _saveMsgSettings();
  const idMap = { notif:'settingNotifToggle', sound:'settingSoundToggle', read:'settingReadToggle', online:'settingOnlineToggle' };
  const el = document.getElementById(idMap[key]);
  if (el) el.classList.toggle('on', _msgSettings[key]);
  showToast(_msgSettings[key] ? 'Activado' : 'Desactivado');
}

function msgToggleSetting(key, toggleId) {
  toggleMsgSetting(key);
}

function msgToggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', current);
  localStorage.setItem('fynderTheme', current);
  
  const icon = document.getElementById('settingThemeIcon');
  const sub = document.getElementById('settingThemeSub');
  const toggle = document.getElementById('settingThemeToggle');
  
  if (current === 'dark') {
    if (icon) icon.innerHTML = '<i class="fas fa-moon"></i>';
    if (sub) sub.textContent = 'Tema actual: oscuro';
    if (toggle) toggle.classList.add('on');
  } else {
    if (icon) icon.innerHTML = '<i class="fas fa-sun"></i>';
    if (sub) sub.textContent = 'Tema actual: claro';
    if (toggle) toggle.classList.remove('on');
  }
  
  showToast(`Tema ${current === 'dark' ? 'oscuro' : 'claro'} activado`);
}

function setChatWallpaper(wp, btn) {
  _loadMsgSettings();
  _msgSettings.wallpaper = wp;
  _saveMsgSettings();
  _applyChatWallpaper(wp);
  
  // Actualizar UI
  document.querySelectorAll('.msg-wallpaper-dot').forEach(d => d.classList.remove('active'));
  if (btn) btn.classList.add('active');
  
  const names = { 
    default: 'Por defecto', 
    dots: 'Patrón de puntos', 
    gradient: 'Gradiente', 
    dark: 'Oscuro total', 
    nature: 'Verde natural' 
  };
  
  const subEl = document.getElementById('settingWallpaperSub');
  if (subEl) subEl.textContent = names[wp] || 'Por defecto';
  
  showToast('Fondo actualizado');
}

function _applyChatWallpaper(wp) {
  const msgs = document.querySelector('.wa-chat-area .chat-messages');
  if (!msgs) return;
  
  ['wp-default', 'wp-dots', 'wp-gradient', 'wp-dark', 'wp-nature'].forEach(c => msgs.classList.remove(c));
  msgs.classList.add('wp-' + wp);
}

function clearAllChats() {
  if (!confirm('¿Borrar TODOS los chats y conversaciones? Esta acción no se puede deshacer.')) return;
  
  // Borrar todos los chats del localStorage
  const keys = Object.keys(localStorage);
  keys.forEach(key => {
    if (key.startsWith('fynderChat_')) {
      localStorage.removeItem(key);
    }
  });
  
  // Limpiar conversaciones
  _saveConversations([]);
  
  showToast('Todos los chats han sido borrados');
  closeMsgSettings();
  
  // Actualizar UI
  renderConversations();
  
  // Si estaba en un chat, cerrar
  const isDesktop = window.innerWidth >= 769;
  if (isDesktop) {
    waCloseChat();
  } else {
    goPage('messages');
  }
}

function setChatBubbleColor(color, name, btn) {
  _loadMsgSettings();
  _msgSettings.bubbleColor = color;
  _saveMsgSettings();
  
  // Actualizar CSS en tiempo real
  _applyChatBubbleColor(color);
  
  // Actualizar TODOS los dots de color (panel de mensajes Y página de ajustes)
  document.querySelectorAll('.msg-color-dot, .sett-color-dot').forEach(d => {
    d.classList.toggle('active', d.dataset.color === color);
  });
  
  // Actualizar label en el panel de mensajes
  const colorSubEl = document.getElementById('settingColorSub');
  if (colorSubEl) colorSubEl.textContent = name;
  
  showToast('Color actualizado');
}

function _applyChatBubbleColor(color) {
  let styleEl = document.getElementById('chatBubbleColorStyle');
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = 'chatBubbleColorStyle';
    document.head.appendChild(styleEl);
  }
  styleEl.textContent = `.chat-msg-row.out .chat-bubble { background: ${color} !important; }`;
}

function setChatFontSize(size, label) {
  _loadMsgSettings();
  _msgSettings.fontSize = size;
  _saveMsgSettings();
  
  // Aplicar tamaño
  _applyChatFontSize(size);
  
  // Actualizar label en el panel de mensajes
  const fontSubEl = document.getElementById('settingFontSub');
  if (fontSubEl) fontSubEl.textContent = label;
  
  // Actualizar TODOS los botones de tamaño (panel de mensajes Y página de ajustes)
  document.querySelectorAll('.msg-font-btn, .sett-font-btn').forEach((btn, i) => {
    const sizes = ['small','normal','large'];
    btn.classList.toggle('active', sizes[i] === size);
  });
  
  showToast('Tamaño actualizado');
}

function _applyChatFontSize(size) {
  const msgs = document.getElementById('chatMessages');
  if (!msgs) return;
  ['font-small','font-normal','font-large'].forEach(c => msgs.classList.remove(c));
  msgs.classList.add('font-' + size);
}

function exportChats() {
  const convs = _getConversations();
  if (convs.length === 0) { showToast('No hay conversaciones para exportar'); return; }
  let txt = 'Conversaciones de Fynder\n' + '='.repeat(40) + '\n\n';
  convs.forEach(c => {
    const msgs = _getMsgs(c.id);
    txt += `=== ${c.name} ===\n`;
    msgs.forEach(m => { txt += `[${m.date} ${m.time}] ${m.from === 'user' ? 'Yo' : c.name}: ${m.text}\n`; });
    txt += '\n';
  });
  const blob = new Blob([txt], { type: 'text/plain;charset=utf-8' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url; a.download = 'fynder-chats.txt'; a.click();
  URL.revokeObjectURL(url);
  showToast('Conversaciones exportadas');
}

function clearAllChats() {
  if (!confirm('¿Borrar TODOS los chats? Esta acción no se puede deshacer.')) return;
  const convs = _getConversations();
  convs.forEach(c => localStorage.removeItem('fynderChat_' + c.id));
  _saveConversations([]);
  _saveBookmarks([]);
  updateMsgBadge();
  renderConversations();
  closeMsgSettings();
  showToast('Todos los chats eliminados');
}

// ---- Aplicar ajustes al iniciar ----
document.addEventListener('DOMContentLoaded', () => {
  _loadMsgSettings();
  if (_msgSettings.bubbleColor) _applyChatBubbleColor(_msgSettings.bubbleColor);
  if (_msgSettings.fontSize)    _applyChatFontSize(_msgSettings.fontSize);
});

/* ================================================================
   PHOTO LIGHTBOX – abre galería de fotos del negocio
   ================================================================ */

function openPhotoLightbox() {
  if (!_activeChatBizId) return;
  const biz = BUSINESSES.find(b => String(b.id) === String(_activeChatBizId));
  if (!biz) return;
  const imgs = [];
  if (biz.logo)  imgs.push({ src: biz.logo,  caption: 'Logo' });
  if (biz.image) imgs.push({ src: biz.image, caption: biz.name });

  if (!imgs.length) { showToast('Sin fotos disponibles'); return; }

  let currentIdx = 0;
  const overlay = document.createElement('div');
  overlay.id = 'photoLightbox';
  overlay.style.cssText = 'position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.92);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;';

  function render() {
    const img = imgs[currentIdx];
    overlay.innerHTML = `
      <button onclick="document.getElementById('photoLightbox').remove()" style="position:absolute;top:16px;right:16px;background:rgba(255,255,255,.15);border:none;color:#fff;width:40px;height:40px;border-radius:50%;font-size:1.2rem;cursor:pointer;display:flex;align-items:center;justify-content:center;"><i class="fas fa-xmark"></i></button>
      <img src="${img.src}" style="max-width:90vw;max-height:70dvh;border-radius:16px;object-fit:contain;box-shadow:0 8px 40px rgba(0,0,0,.6);" loading="lazy">
      <p style="color:rgba(255,255,255,.7);font-size:.875rem;font-family:'Inter',sans-serif;margin:0;">${escapeHtml(img.caption)} · ${currentIdx+1}/${imgs.length}</p>
      ${imgs.length > 1 ? `
      <div style="display:flex;gap:12px;">
        <button onclick="lightboxNav(-1)" style="background:rgba(255,255,255,.15);border:none;color:#fff;padding:10px 20px;border-radius:10px;cursor:pointer;font-size:.875rem;">‹ Anterior</button>
        <button onclick="lightboxNav(1)"  style="background:rgba(255,255,255,.15);border:none;color:#fff;padding:10px 20px;border-radius:10px;cursor:pointer;font-size:.875rem;">Siguiente ›</button>
      </div>` : ''}
    `;
  }
  window.lightboxNav = (dir) => {
    currentIdx = (currentIdx + dir + imgs.length) % imgs.length;
    render();
  };
  render();
  document.body.appendChild(overlay);
}

/* ================================================================
   PÁGINA DE AJUSTES
   ================================================================ */

/** Navega a una sección del panel de ajustes */
function settGoSection(id, btn) {
  document.querySelectorAll('#page-settings .sett-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('#page-settings .sett-nav-item').forEach(b => b.classList.remove('active'));

  const sec = document.getElementById('sett-' + id);
  if (sec) sec.classList.add('active');
  if (btn) btn.classList.add('active');

  // Sync específico al entrar en cada sección
  if (id === 'cuenta')         settSyncAccount();
  if (id === 'apariencia')     settSyncAppearance();
  if (id === 'notificaciones') settSyncNotif();
  if (id === 'privacidad')     settSyncNotif();   // read toggle vive aquí también
  if (id === 'accesibilidad')  settSyncAccessibility();
  if (id === 'datos')          settSyncStorage();
  if (id === 'rendimiento')    settSyncRendimiento();
  if (id === 'sistema')        settSyncSistema();
  if (id === 'herramientas')   settSyncHerramientas();
  if (id === 'idioma')         settSyncIdioma();
  if (id === 'amigos')         settSyncAmigos();
  if (id === 'mensajes')       settSyncMensajesSection();
}

/** Helper para navegar desde dentro del contenido (sin referencia al botón) */
function settGoToSection(id) {
  const btn = document.querySelector(`#page-settings .sett-nav-item[data-section="${id}"]`);
  settGoSection(id, btn);
}

/** Inicializa la página cada vez que se navega a ella */
function initSettingsPage() {
  // Activar sección "cuenta" por defecto
  const firstBtn = document.querySelector('#page-settings .sett-nav-item[data-section="cuenta"]');
  settGoSection('cuenta', firstBtn);
}

// ── CUENTA ─────────────────────────────────────────────────────────────────

function settSyncAccount() {
  const user = JSON.parse(localStorage.getItem('fynderUser') || '{}');

  const nameEl  = document.getElementById('settUserName');
  const emailEl = document.getElementById('settUserEmail');
  const avaEl   = document.getElementById('settUserAvatar');

  if (nameEl)  nameEl.textContent  = user.name  || 'Usuario';
  if (emailEl) emailEl.textContent = user.email || '—';

  if (avaEl) {
    const photo  = localStorage.getItem('fynderAvatarPhoto');
    const preset = localStorage.getItem('fynderAvatarPreset');
    if (photo) {
      avaEl.innerHTML = `<img src="${photo}" alt="avatar" style="width:100%;height:100%;object-fit:cover;border-radius:50%">`;
    } else if (preset) {
      avaEl.innerHTML = '';
      avaEl.textContent = preset;
    } else {
      avaEl.innerHTML = '';
      avaEl.textContent = (user.name || 'U')[0].toUpperCase();
      const bg = localStorage.getItem('fynderAvatarInitialBg');
      if (bg) avaEl.style.background = bg;
    }
  }

  const planEl = document.getElementById('settPlanLabel');
  if (planEl) {
    const bizList = JSON.parse(localStorage.getItem('fynderBusinesses') || '[]');
    planEl.textContent = bizList[0]?.plan || 'Free';
  }
  // Sincronizar modo invisible
  _syncInvisibleSetting();
  // Sincronizar conteo de amigos
  _updateFriendCount();
}

/** Cierra sesión correctamente usando la función centralizada */
function settLogout() {
  if (!confirm('¿Cerrar sesión?')) return;
  logout();   // llama a la función completa que limpia todo
}

// ── APARIENCIA ──────────────────────────────────────────────────────────────

function settSyncAppearance() {
  _loadMsgSettings();

  // Modo oscuro
  const darkBtn = document.getElementById('settDarkToggle');
  if (darkBtn) {
    darkBtn.classList.toggle('on', document.documentElement.getAttribute('data-theme') === 'dark');
  }

  // Tamaño de fuente del chat
  const fontBtns = document.querySelectorAll('#sett-apariencia .sett-font-btn');
  const sizes = ['small', 'normal', 'large'];
  const currentSize = _msgSettings.fontSize || 'normal';
  fontBtns.forEach((btn, i) => btn.classList.toggle('active', sizes[i] === currentSize));

  // Color de burbujas
  const currentColor = _msgSettings.bubbleColor || '#1a5c34';
  document.querySelectorAll('#sett-apariencia .sett-color-dot').forEach(dot => {
    dot.classList.toggle('active', dot.dataset.color === currentColor);
  });
}

function settToggleDark() {
  toggleDarkMode();
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const btn = document.getElementById('settDarkToggle');
  if (btn) btn.classList.toggle('on', isDark);
}

// ── NOTIFICACIONES / PRIVACIDAD ─────────────────────────────────────────────

function settSyncNotif() {
  _loadMsgSettings();

  // Estado del permiso nativo del navegador
  const statusEl = document.getElementById('settNotifStatusLabel');
  if (statusEl) {
    if (!('Notification' in window)) {
      statusEl.textContent = '⚠️ No compatible con este navegador';
    } else {
      const map = { granted: '✅ Activadas', denied: '🚫 Bloqueadas por el navegador', default: 'Sin configurar — haz clic en Activar' };
      statusEl.textContent = map[Notification.permission] || 'Sin configurar';
    }
  }

  // Botón "Activar": cambiar texto/estado según permiso
  const activarBtn = document.getElementById('settNotifActivarBtn');
  if (activarBtn) {
    const perm = ('Notification' in window) ? Notification.permission : 'unsupported';
    if (perm === 'granted') {
      activarBtn.textContent = '✓ Activado';
      activarBtn.style.background = '#10B981';
      activarBtn.style.color = '#fff';
      activarBtn.style.borderColor = '#10B981';
      activarBtn.disabled = true;
      activarBtn.onclick = null;
    } else if (perm === 'denied') {
      activarBtn.textContent = '🚫 Bloqueado';
      activarBtn.style.background = '';
      activarBtn.style.color = '#EF4444';
      activarBtn.style.borderColor = '#EF4444';
      activarBtn.disabled = true;
      activarBtn.onclick = null;
    } else if (perm === 'unsupported') {
      activarBtn.style.display = 'none';
    } else {
      activarBtn.textContent = 'Activar';
      activarBtn.style.background = '';
      activarBtn.style.color = '';
      activarBtn.style.borderColor = '';
      activarBtn.disabled = false;
      activarBtn.onclick = () => handleNotifBannerClick(activarBtn).then(() => settSyncNotif());
    }
  }

  // Toggles de notificaciones de chat y sonido
  const chatT  = document.getElementById('settNotifChatToggle');
  const soundT = document.getElementById('settSoundToggle2');
  if (chatT)  chatT.classList.toggle('on', _msgSettings.notif);
  if (soundT) soundT.classList.toggle('on', _msgSettings.sound);

  // Toggle de confirmación de lectura (sección privacidad)
  const readT = document.getElementById('settReadToggle2');
  if (readT) readT.classList.toggle('on', _msgSettings.read);
}

/** Toggle genérico de preferencias de mensajes/ajustes */
function settToggleSetting(key, btnId) {
  // Claves de mensajes (legacy _msgSettings)
  const msgKeys = ['notif', 'sound', 'read'];
  if (msgKeys.includes(key)) {
    _loadMsgSettings();
    _msgSettings[key] = !_msgSettings[key];
    _saveMsgSettings();
    const btn = document.getElementById(btnId);
    if (btn) btn.classList.toggle('on', _msgSettings[key]);
    const mirror = { notif: 'settingNotifToggle', sound: 'settingSoundToggle', read: 'settingReadToggle' };
    const mirrorEl = document.getElementById(mirror[key]);
    if (mirrorEl) mirrorEl.classList.toggle('on', _msgSettings[key]);
    showToast(_msgSettings[key] ? 'Activado' : 'Desactivado');
    return;
  }

  // Claves de ajustes generales (localStorage fynder_key)
  const lsKey = 'fynder_' + key;
  const btn = document.getElementById(btnId);
  const currentVal = btn ? btn.classList.contains('on') : localStorage.getItem(lsKey) === '1';
  const newVal = !currentVal;
  localStorage.setItem(lsKey, newVal ? '1' : '0');
  if (btn) btn.classList.toggle('on', newVal);
  showToast(newVal ? 'Activado' : 'Desactivado');
}

// ── ACCESIBILIDAD ───────────────────────────────────────────────────────────

function settSyncAccessibility() {
  // Tamaño de fuente UI
  const sel = document.getElementById('settUIFontSize');
  if (sel) {
    const saved = localStorage.getItem('fynderUIFontSize') || 'normal';
    sel.value = saved;
  }

  // Reducir animaciones
  const rmBtn = document.getElementById('settReduceMotion');
  if (rmBtn) rmBtn.classList.toggle('on', document.documentElement.hasAttribute('data-reduce-motion'));
}

function settSetUIFontSize(val) {
  const map = { normal: '16px', large: '18px', xlarge: '20px' };
  document.documentElement.style.fontSize = map[val] || '16px';
  localStorage.setItem('fynderUIFontSize', val);
  showToast('Tamaño de fuente actualizado');
}

function settToggleReduceMotion() {
  const btn = document.getElementById('settReduceMotion');
  const active = document.documentElement.hasAttribute('data-reduce-motion');
  if (active) {
    document.documentElement.removeAttribute('data-reduce-motion');
    localStorage.removeItem('fynderReduceMotion');
    if (btn) btn.classList.remove('on');
    showToast('Animaciones activadas');
  } else {
    document.documentElement.setAttribute('data-reduce-motion', '1');
    localStorage.setItem('fynderReduceMotion', '1');
    if (btn) btn.classList.add('on');
    showToast('Animaciones reducidas');
  }
}

// ── DATOS ────────────────────────────────────────────────────────────────────

function settSyncStorage() {
  const el = document.getElementById('settStorageLabel');
  if (!el) return;
  let bytes = 0;
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && k.startsWith('fynder')) {
      bytes += ((localStorage.getItem(k) || '').length * 2); // UTF-16
    }
  }
  const kb = (bytes / 1024).toFixed(1);
  el.textContent = `${kb} KB usados (localStorage)`;

  // Barra de progreso (localStorage máx ~5MB)
  const bar = document.getElementById('settStorageBar');
  if (bar) {
    const pct = Math.min((bytes / (5 * 1024 * 1024)) * 100, 100).toFixed(1);
    bar.style.width = pct + '%';
  }
}

function settClearData() {
  if (!confirm('¿Limpiar caché y preferencias locales?\n\nSe perderán: conversaciones, favoritos guardados y ajustes de la app.\nTu cuenta (nombre y contraseña) se mantendrá.')) return;

  const keep = ['fynderUser', 'fynderLogged', 'fynderTheme'];
  const toRemove = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && k.startsWith('fynder') && !keep.includes(k)) toRemove.push(k);
  }
  toRemove.forEach(k => localStorage.removeItem(k));

  // Reinicializar estado en memoria
  favorites.clear();
  updateNav();

  showToast('✅ Datos limpiados correctamente');
  settSyncStorage();
}

// ── HELPERS ──────────────────────────────────────────────────────────────────

/** Sincroniza los controles de apariencia del panel de mensajes cuando se cambian desde Ajustes */
function settSyncMsgUI() {
  _loadMsgSettings();
  
  // Sincronizar dots de color (panel de mensajes)
  document.querySelectorAll('.msg-color-dot').forEach(d => {
    d.classList.toggle('active', d.dataset.color === _msgSettings.bubbleColor);
  });
  
  // Sincronizar dots de color (página de ajustes)
  document.querySelectorAll('.sett-color-dot').forEach(d => {
    d.classList.toggle('active', d.dataset.color === _msgSettings.bubbleColor);
  });
  
  // Sincronizar botones de fuente (panel de mensajes)
  document.querySelectorAll('.msg-font-btn').forEach((btn, i) => {
    const sizes = ['small', 'normal', 'large'];
    btn.classList.toggle('active', sizes[i] === (_msgSettings.fontSize || 'normal'));
  });
  
  // Sincronizar botones de fuente (página de ajustes)
  document.querySelectorAll('.sett-font-btn').forEach((btn, i) => {
    const sizes = ['small', 'normal', 'large'];
    btn.classList.toggle('active', sizes[i] === (_msgSettings.fontSize || 'normal'));
  });
}

/** Sincroniza los toggles y labels de la sección de ajustes de Mensajes */
function settSyncMensajesSection() {
  // Restringir chat
  const restBtn = document.getElementById('settRestringirToggle');
  if (restBtn) restBtn.classList.toggle('on', localStorage.getItem('fynder_restringirChat') === '1');

  // Privacidad avanzada
  const privBtn = document.getElementById('settPrivAdvToggle');
  const privVal = localStorage.getItem('fynder_privAvanzada') === '1';
  if (privBtn) privBtn.classList.toggle('on', privVal);
  const privLabel = document.getElementById('settPrivAdvLabel');
  if (privLabel) privLabel.textContent = privVal ? 'Activada' : 'Desactivada';

  // Traducir mensajes
  const tradBtn = document.getElementById('settTraducirToggle');
  if (tradBtn) tradBtn.classList.toggle('on', localStorage.getItem('fynder_traducirMensajes') === '1');

  // Idioma de transcripciones
  const transcLabel = document.getElementById('settTranscripcionLabel');
  if (transcLabel) {
    const lang = localStorage.getItem('fynder_transcripcionLang') || 'Español';
    transcLabel.textContent = lang;
  }
}

/** Toggle especial para privacidad avanzada (actualiza el label) */
function settToggleMsgPriv() {
  const currentVal = localStorage.getItem('fynder_privAvanzada') === '1';
  const newVal = !currentVal;
  localStorage.setItem('fynder_privAvanzada', newVal ? '1' : '0');
  const btn = document.getElementById('settPrivAdvToggle');
  if (btn) btn.classList.toggle('on', newVal);
  const label = document.getElementById('settPrivAdvLabel');
  if (label) label.textContent = newVal ? 'Activada' : 'Desactivada';
  showToast(newVal ? 'Privacidad avanzada activada' : 'Privacidad avanzada desactivada');
}

/** Filtro de búsqueda en el sidebar */
function settFilterSections(q) {
  const query = q.toLowerCase().trim();
  document.querySelectorAll('#page-settings .sett-nav-item').forEach(btn => {
    const text = btn.textContent.toLowerCase();
    btn.style.display = (!query || text.includes(query)) ? '' : 'none';
  });
  document.querySelectorAll('#page-settings .sett-nav-divider').forEach(d => {
    d.style.display = query ? 'none' : '';
  });
}

// ── HERRAMIENTAS ─────────────────────────────────────────────────────────────

function settSyncHerramientas() {
  // Cerrar todos los expandibles al entrar a la sección
  document.querySelectorAll('#sett-herramientas .sett-expandable').forEach(e => e.classList.remove('open'));
  document.querySelectorAll('#sett-herramientas .sett-row-expandable').forEach(r => r.classList.remove('expanded'));
}

/** Abre/cierra un bloque expandible dentro de ajustes */
function settToggleExpand(id, row) {
  const panel = document.getElementById(id);
  if (!panel) return;
  const isOpen = panel.classList.contains('open');

  // Cerrar los demás del mismo grupo
  const parentSection = row.closest('.sett-section');
  if (parentSection) {
    parentSection.querySelectorAll('.sett-expandable.open').forEach(p => {
      if (p !== panel) {
        p.classList.remove('open');
        const sibRow = p.previousElementSibling;
        if (sibRow) sibRow.classList.remove('expanded');
      }
    });
  }

  panel.classList.toggle('open', !isOpen);
  row.classList.toggle('expanded', !isOpen);
}

// ── RENDIMIENTO ───────────────────────────────────────────────────────────────

function settSyncRendimiento() {
  // Sincronizar toggles de rendimiento desde localStorage
  const toggleMap = {
    perfAlerts:  'settPerfAlertsToggle',
    inactiveTabs:'settInactiveTabsToggle',
    memSaver:    'settMemSaverToggle',
    preload:     'settPreloadToggle',
  };
  Object.entries(toggleMap).forEach(([key, id]) => {
    const el = document.getElementById(id);
    if (el) {
      const saved = localStorage.getItem('fynder_' + key);
      // Default: activado excepto memSaver
      const defaultOn = key !== 'memSaver';
      const isOn = saved !== null ? saved === '1' : defaultOn;
      el.classList.toggle('on', isOn);
    }
  });

  // Ahorro de energía
  const energyBtn = document.getElementById('settEnergySaverToggle');
  if (energyBtn) energyBtn.classList.toggle('on', localStorage.getItem('fynderEnergySaver') === '1');

  // Modo de energía
  const eMode = parseInt(localStorage.getItem('fynderEnergyMode') || '1');
  settSelectEnergyMode(eMode);

  // Modo de precarga
  const pMode = parseInt(localStorage.getItem('fynderPreloadMode') || '2');
  settSelectPreloadMode(pMode);
}

function settSyncSistema() {
  const sysToggles = {
    bgRun:    'settBgRunToggle',
    hwAccel:  'settHwAccelToggle',
    sysNotif: 'settSysNotifToggle',
    localAI:  'settLocalAIToggle',
  };
  Object.entries(sysToggles).forEach(([key, id]) => {
    const el = document.getElementById(id);
    if (el) {
      const saved = localStorage.getItem('fynder_' + key);
      const isOn = saved !== null ? saved === '1' : true; // todos on por defecto
      el.classList.toggle('on', isOn);
    }
  });
}

function settToggleEnergySaver() {
  const btn = document.getElementById('settEnergySaverToggle');
  const isOn = btn && btn.classList.contains('on');
  if (btn) btn.classList.toggle('on', !isOn);
  localStorage.setItem('fynderEnergySaver', !isOn ? '1' : '');
  showToast(!isOn ? 'Ahorro de energía activado' : 'Ahorro de energía desactivado');
}

function settSelectEnergyMode(mode) {
  const d1 = document.getElementById('settEnergyOpt1');
  const d2 = document.getElementById('settEnergyOpt2');
  if (d1) d1.classList.toggle('active', mode === 1);
  if (d2) d2.classList.toggle('active', mode === 2);
  localStorage.setItem('fynderEnergyMode', mode);
}

function settSelectPreloadMode(mode) {
  const d1 = document.getElementById('settPreloadOpt1');
  const d2 = document.getElementById('settPreloadOpt2');
  if (d1) d1.classList.toggle('active', mode === 1);
  if (d2) d2.classList.toggle('active', mode === 2);
  localStorage.setItem('fynderPreloadMode', mode);
  showToast(mode === 1 ? 'Precarga ampliada activada' : 'Precarga estándar activada');
}

// ── RESTABLECER ───────────────────────────────────────────────────────────────

function settResetConfig() {
  if (!confirm('¿Restaurar todos los ajustes a sus valores predeterminados?\n\nTus datos de cuenta y negocios no se verán afectados.')) return;

  // Eliminar solo claves de ajustes (no datos de cuenta)
  const keepKeys = ['fynderUser', 'fynderLogged', 'fynderBusinesses', 'fynderChats'];
  const toRemove = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && k.startsWith('fynder') && !keepKeys.includes(k)) toRemove.push(k);
  }
  toRemove.forEach(k => localStorage.removeItem(k));

  // Restaurar tema claro
  document.documentElement.removeAttribute('data-theme');
  document.documentElement.style.fontSize = '16px';
  document.documentElement.removeAttribute('data-reduce-motion');

  showToast('✅ Ajustes restablecidos a valores predeterminados');
  // Recargar la sección actual
  const btn = document.querySelector('#page-settings .sett-nav-item.active');
  if (btn) settGoSection(btn.dataset.section, btn);
}


// ── INICIALIZACIÓN ────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  // Restaurar tamaño de fuente UI
  const savedFont = localStorage.getItem('fynderUIFontSize');
  if (savedFont) {
    const map = { normal: '16px', large: '18px', xlarge: '20px' };
    document.documentElement.style.fontSize = map[savedFont] || '16px';
  }
  // Restaurar reducción de animaciones
  if (localStorage.getItem('fynderReduceMotion')) {
    document.documentElement.setAttribute('data-reduce-motion', '1');
  }
  // Auto-traducción al iniciar
  _initAutoTranslate();
});

// ══════════════════════════════════════════════════════════════════════════════
// MODO INVISIBLE
// ══════════════════════════════════════════════════════════════════════════════

function settToggleInvisible() {
  const isOn = localStorage.getItem('fynderInvisible') === '1';
  const newVal = !isOn;
  localStorage.setItem('fynderInvisible', newVal ? '1' : '0');

  const btn = document.getElementById('settInvisibleToggle');
  const sub = document.getElementById('settInvisibleSub');
  if (btn) btn.classList.toggle('on', newVal);
  if (sub) sub.textContent = newVal
    ? 'Estás invisible — nadie ve que estás en línea'
    : 'Los demás ven que estás en línea';
  showToast(newVal ? '🕵️ Modo invisible activado' : '👁️ Modo invisible desactivado');

  // Aplicar indicador visual de estado
  _applyInvisibleMode(newVal);
}

function _applyInvisibleMode(invisible) {
  // Oculta o muestra el indicador verde de "en línea" en el avatar del navbar
  const onlineDots = document.querySelectorAll('.online-dot, .user-online-badge');
  onlineDots.forEach(d => d.style.display = invisible ? 'none' : '');
}

function _syncInvisibleSetting() {
  const isOn = localStorage.getItem('fynderInvisible') === '1';
  const btn = document.getElementById('settInvisibleToggle');
  const sub = document.getElementById('settInvisibleSub');
  if (btn) btn.classList.toggle('on', isOn);
  if (sub) sub.textContent = isOn
    ? 'Estás invisible — nadie ve que estás en línea'
    : 'Los demás ven que estás en línea';
  _applyInvisibleMode(isOn);
}

// ══════════════════════════════════════════════════════════════════════════════
// AMIGOS
// ══════════════════════════════════════════════════════════════════════════════

function _getFriends()        { return JSON.parse(localStorage.getItem('fynderFriends')  || '[]'); }
function _getFriendRequests() { return JSON.parse(localStorage.getItem('fynderFriendReqs') || '[]'); }
function _saveFriends(arr)    { localStorage.setItem('fynderFriends', JSON.stringify(arr)); }
function _saveFriendReqs(arr) { localStorage.setItem('fynderFriendReqs', JSON.stringify(arr)); }

/** Inicializa datos de demo para amigos si no hay ninguno */
function _seedFriendsDemo() {
  if (_getFriends().length > 0) return;
  const demo = [
    { id:'f1', name:'Ana García',    email:'ana@ejemplo.com',    online:true  },
    { id:'f2', name:'Carlos López',  email:'carlos@ejemplo.com', online:false },
    { id:'f3', name:'María Pérez',   email:'maria@ejemplo.com',  online:true  },
  ];
  _saveFriends(demo);
  const req = [
    { id:'r1', name:'Juan Rodríguez', email:'juan@ejemplo.com' },
  ];
  _saveFriendReqs(req);
}

function settSyncAmigos() {
  _seedFriendsDemo();
  _renderFriendRequests();
  _renderFriendList();
  _updateFriendCount();
}

function _updateFriendCount() {
  const friends = _getFriends();
  const reqs    = _getFriendRequests();
  const total   = document.getElementById('settFriendTotal');
  if (total) total.textContent = `(${friends.length})`;

  const badge = document.getElementById('settFriendReqBadge');
  if (badge) {
    badge.textContent = reqs.length;
    badge.style.display = reqs.length > 0 ? 'inline-flex' : 'none';
  }

  // Actualizar sub en "Tú y Fynder"
  const sub = document.getElementById('settFriendCountSub');
  if (sub) sub.textContent = friends.length > 0 ? `${friends.length} amigo${friends.length !== 1 ? 's' : ''}` : 'Ver lista de amigos';
}

function _renderFriendRequests() {
  const cont = document.getElementById('settFriendRequests');
  if (!cont) return;
  const reqs = _getFriendRequests();
  if (reqs.length === 0) {
    cont.innerHTML = '<div class="sett-empty-state"><i class="fas fa-user-check"></i><span>Sin solicitudes pendientes</span></div>';
    return;
  }
  cont.innerHTML = reqs.map(r => `
    <div class="sett-req-row" id="req-${r.id}">
      <div class="sett-friend-avatar" style="background:#2F5BB7">${r.name[0].toUpperCase()}</div>
      <div class="sett-friend-info">
        <span class="sett-friend-name">${r.name}</span>
        <span class="sett-friend-email">${r.email}</span>
      </div>
      <div class="sett-friend-actions">
        <button class="sett-req-accept" onclick="acceptFriendReq('${r.id}')"><i class="fas fa-check"></i> Aceptar</button>
        <button class="sett-req-decline" onclick="declineFriendReq('${r.id}')"><i class="fas fa-xmark"></i></button>
      </div>
    </div>`).join('');
}

function _renderFriendList(filter) {
  const cont = document.getElementById('settFriendList');
  if (!cont) return;
  let friends = _getFriends();
  if (filter) friends = friends.filter(f =>
    f.name.toLowerCase().includes(filter) || (f.email || '').toLowerCase().includes(filter));

  if (friends.length === 0) {
    cont.innerHTML = filter
      ? '<div class="sett-empty-state"><i class="fas fa-magnifying-glass"></i><span>Sin resultados</span></div>'
      : '<div class="sett-empty-state"><i class="fas fa-user-group"></i><span>Aún no tienes amigos agregados</span></div>';
    return;
  }
  cont.innerHTML = friends.map(f => `
    <div class="sett-friend-row" id="fr-${f.id}">
      <div class="sett-friend-avatar">${f.name[0].toUpperCase()}</div>
      <div class="sett-friend-status ${f.online ? '' : 'offline'}"></div>
      <div class="sett-friend-info">
        <span class="sett-friend-name">${f.name}</span>
        <span class="sett-friend-email">${f.online ? '🟢 En línea' : '⚫ Desconectado'} · ${f.email}</span>
      </div>
      <div class="sett-friend-actions">
        <button class="sett-friend-btn" onclick="msgFriend('${f.id}','${f.name}')"><i class="fas fa-comment-dots"></i> Mensaje</button>
        <button class="sett-friend-btn danger" onclick="removeFriend('${f.id}')"><i class="fas fa-user-minus"></i></button>
      </div>
    </div>`).join('');
}

function settSearchFriends(q) {
  _renderFriendList(q.toLowerCase().trim() || undefined);
}

function acceptFriendReq(id) {
  const reqs    = _getFriendRequests();
  const idx     = reqs.findIndex(r => r.id === id);
  if (idx === -1) return;
  const [req]   = reqs.splice(idx, 1);
  _saveFriendReqs(reqs);
  const friends = _getFriends();
  friends.push({ id: req.id, name: req.name, email: req.email, online: false });
  _saveFriends(friends);
  _renderFriendRequests();
  _renderFriendList();
  _updateFriendCount();
  showToast(`✅ ¡Ahora eres amigo de ${req.name}!`);
}

function declineFriendReq(id) {
  const reqs = _getFriendRequests().filter(r => r.id !== id);
  _saveFriendReqs(reqs);
  _renderFriendRequests();
  _updateFriendCount();
  showToast('Solicitud rechazada');
}

function removeFriend(id) {
  const friends = _getFriends();
  const f = friends.find(x => x.id === id);
  if (!f) return;
  if (!confirm(`¿Eliminar a ${f.name} de tus amigos?`)) return;
  _saveFriends(friends.filter(x => x.id !== id));
  _renderFriendList();
  _updateFriendCount();
  showToast(`${f.name} eliminado de tus amigos`);
}

function msgFriend(id, name) {
  showToast(`💬 Abriendo chat con ${name}...`);
  setTimeout(() => goPage('messages'), 600);
}

// ══════════════════════════════════════════════════════════════════════════════
// IDIOMA / TRADUCCIÓN — Sistema propio con diccionario
// ══════════════════════════════════════════════════════════════════════════════

const LANG_NAMES = {
  es:'Español', en:'English', fr:'Français', pt:'Português',
  de:'Deutsch', it:'Italiano', zh:'中文', ja:'日本語', ko:'한국어',
  ar:'العربية', ru:'Русский'
};

function _detectBrowserLang() {
  const lang = (navigator.language || navigator.userLanguage || 'es').slice(0,2).toLowerCase();
  return LANG_NAMES[lang] ? lang : 'es';
}
function _langFlag(code) {
  const f = {es:'🇪🇸',en:'🇺🇸',fr:'🇫🇷',pt:'🇧🇷',de:'🇩🇪',it:'🇮🇹',zh:'🇨🇳',ja:'🇯🇵',ko:'🇰🇷',ar:'🇸🇦',ru:'🇷🇺'};
  return f[code] || '🌐';
}

// ── Diccionario de traducciones ──────────────────────────────────────────────
const I18N = {
  // Nav
  'nav.home':        { es:'Inicio',      en:'Home',       fr:'Accueil',    pt:'Início',    de:'Startseite' },
  'nav.directory':   { es:'Directorio',  en:'Directory',  fr:'Annuaire',   pt:'Diretório', de:'Verzeichnis' },
  'nav.saved':       { es:'Guardados',   en:'Saved',      fr:'Enregistrés',pt:'Salvos',    de:'Gespeichert' },
  'nav.messages':    { es:'Mensajes',    en:'Messages',   fr:'Messages',   pt:'Mensagens', de:'Nachrichten' },
  'nav.login':       { es:'Iniciar sesión', en:'Sign in', fr:'Connexion',  pt:'Entrar',    de:'Anmelden' },
  'nav.register':    { es:'Registrar negocio', en:'Register business', fr:'Enregistrer entreprise', pt:'Registrar negócio', de:'Unternehmen registrieren' },
  // Hero
  'hero.pill':       { es:'Descubre negocios cerca de ti', en:'Discover businesses near you', fr:'Découvrez les entreprises près de vous', pt:'Descubra negócios perto de você', de:'Entdecke Unternehmen in deiner Nähe' },
  'hero.title1':     { es:'Encuentra los mejores', en:'Find the best', fr:'Trouvez les meilleurs', pt:'Encontre os melhores', de:'Finde die besten' },
  'hero.title2':     { es:'negocios locales', en:'local businesses', fr:'commerces locaux', pt:'negócios locais', de:'lokalen Unternehmen' },
  'hero.desc':       { es:'FYNDER conecta personas con emprendedores y comercios de su comunidad. Descubre, explora y apoya a los negocios que hacen grande tu ciudad.', en:'FYNDER connects people with entrepreneurs and businesses in their community. Discover, explore and support the businesses that make your city great.', fr:'FYNDER connecte les personnes avec les entrepreneurs et les commerces de leur communauté.', pt:'FYNDER conecta pessoas com empreendedores e comércios de sua comunidade.', de:'FYNDER verbindet Menschen mit Unternehmern und Betrieben in ihrer Gemeinde.' },
  'hero.search.ph':  { es:'Ej: "Pasteles", "Peluquería"...', en:'E.g. "Cakes", "Barbershop"...', fr:'Ex: "Gâteaux", "Coiffeur"...', pt:'Ex: "Bolos", "Barbearia"...', de:'Z.B. "Kuchen", "Friseur"...' },
  'hero.search.btn': { es:'Buscar', en:'Search', fr:'Rechercher', pt:'Buscar', de:'Suchen' },
  'hero.popular':    { es:'Popular:', en:'Popular:', fr:'Populaire:', pt:'Popular:', de:'Beliebt:' },
  // Sections
  'sec.categories.label': { es:'Explorar por categoría', en:'Browse by category', fr:'Parcourir par catégorie', pt:'Explorar por categoria', de:'Nach Kategorie durchsuchen' },
  'sec.categories.title': { es:'¿Qué estás buscando?', en:'What are you looking for?', fr:'Que cherchez-vous?', pt:'O que você está procurando?', de:'Was suchst du?' },
  'sec.categories.all':   { es:'Ver todas', en:'See all', fr:'Voir tout', pt:'Ver todas', de:'Alle anzeigen' },
  'sec.featured.label':   { es:'Selección destacada', en:'Featured selection', fr:'Sélection vedette', pt:'Seleção em destaque', de:'Empfohlene Auswahl' },
  'sec.featured.title':   { es:'Negocios Destacados', en:'Featured Businesses', fr:'Entreprises en vedette', pt:'Negócios em Destaque', de:'Empfohlene Unternehmen' },
  'sec.featured.all':     { es:'Ver todos', en:'See all', fr:'Voir tout', pt:'Ver todos', de:'Alle anzeigen' },
  'sec.popular.title':    { es:'Más Populares', en:'Most Popular', fr:'Les Plus Populaires', pt:'Mais Populares', de:'Am Beliebtesten' },
  // How it works
  'how.label':  { es:'Simple y rápido', en:'Simple and fast', fr:'Simple et rapide', pt:'Simples e rápido', de:'Einfach und schnell' },
  'how.title':  { es:'¿Cómo funciona FYNDER?', en:'How does FYNDER work?', fr:'Comment fonctionne FYNDER?', pt:'Como funciona o FYNDER?', de:'Wie funktioniert FYNDER?' },
  'how.sub':    { es:'En tres simples pasos conectas con los mejores negocios de tu comunidad.', en:'In three simple steps you connect with the best businesses in your community.', fr:'En trois étapes simples, connectez-vous avec les meilleures entreprises.', pt:'Em três etapas simples você se conecta com os melhores negócios.', de:'In drei einfachen Schritten verbindest du dich mit den besten Unternehmen.' },
  'how.step1.title': { es:'Busca lo que necesitas', en:'Search what you need', fr:'Recherchez ce dont vous avez besoin', pt:'Busque o que você precisa', de:'Suche was du brauchst' },
  'how.step1.desc':  { es:'Ingresa el producto, servicio o categoría que estás buscando en nuestro buscador inteligente.', en:'Enter the product, service or category you are looking for in our smart search.', fr:'Entrez le produit, service ou catégorie que vous recherchez.', pt:'Insira o produto, serviço ou categoria que está procurando.', de:'Gib das Produkt, die Dienstleistung oder Kategorie in unsere intelligente Suche ein.' },
  'how.step2.title': { es:'Descubre negocios cercanos', en:'Discover nearby businesses', fr:'Découvrez les entreprises à proximité', pt:'Descubra negócios próximos', de:'Entdecke nahegelegene Unternehmen' },
  'how.step2.desc':  { es:'Explora el directorio de negocios locales con información completa: horarios, contacto y ubicación.', en:'Explore the local business directory with complete information: hours, contact and location.', fr:'Explorez le répertoire des entreprises locales avec des informations complètes.', pt:'Explore o diretório de negócios locais com informações completas.', de:'Erkunde das Verzeichnis lokaler Unternehmen mit vollständigen Informationen.' },
  'how.step3.title': { es:'Conecta y apoya', en:'Connect and support', fr:'Connectez et soutenez', pt:'Conecte e apoie', de:'Verbinden und unterstützen' },
  'how.step3.desc':  { es:'Contacta directamente al negocio, guárdalo en favoritos y comparte con amigos y familia.', en:'Contact the business directly, save it to favorites and share with friends and family.', fr:'Contactez directement l\'entreprise, enregistrez-la et partagez.', pt:'Contate diretamente o negócio, salve nos favoritos e compartilhe.', de:'Kontaktiere das Unternehmen direkt, speichere es und teile es.' },
  // CTA
  'cta.title1':  { es:'¿Tienes un negocio?', en:'Do you have a business?', fr:'Vous avez une entreprise?', pt:'Você tem um negócio?', de:'Haben Sie ein Unternehmen?' },
  'cta.title2':  { es:'Únete a Fynder gratis', en:'Join Fynder for free', fr:'Rejoignez Fynder gratuitement', pt:'Junte-se ao Fynder gratuitamente', de:'Trete Fynder kostenlos bei' },
  'cta.desc':    { es:'Registra tu negocio hoy y llega a miles de clientes potenciales en tu comunidad. Sin comisiones, sin costos ocultos.', en:'Register your business today and reach thousands of potential customers in your community. No commissions, no hidden costs.', fr:'Enregistrez votre entreprise aujourd\'hui et atteignez des milliers de clients potentiels.', pt:'Registre seu negócio hoje e alcance milhares de clientes potenciais.', de:'Registriere dein Unternehmen heute und erreiche Tausende potenzieller Kunden.' },
  'cta.btn1':    { es:'Registrar mi negocio', en:'Register my business', fr:'Enregistrer mon entreprise', pt:'Registrar meu negócio', de:'Mein Unternehmen registrieren' },
  'cta.btn2':    { es:'Saber más', en:'Learn more', fr:'En savoir plus', pt:'Saiba mais', de:'Mehr erfahren' },
  'cta.perk1':   { es:'100% gratuito', en:'100% free', fr:'100% gratuit', pt:'100% gratuito', de:'100% kostenlos' },
  'cta.perk2':   { es:'Activación inmediata', en:'Instant activation', fr:'Activation immédiate', pt:'Ativação imediata', de:'Sofortige Aktivierung' },
  'cta.perk3':   { es:'Miles de usuarios', en:'Thousands of users', fr:'Des milliers d\'utilisateurs', pt:'Milhares de usuários', de:'Tausende von Nutzern' },
  // Directory
  'dir.title':       { es:'Directorio de Negocios', en:'Business Directory', fr:'Annuaire des entreprises', pt:'Diretório de Negócios', de:'Unternehmensverzeichnis' },
  'dir.search.ph':   { es:'Buscar negocios...', en:'Search businesses...', fr:'Rechercher des entreprises...', pt:'Buscar negócios...', de:'Unternehmen suchen...' },
  'dir.all':         { es:'Todos', en:'All', fr:'Tous', pt:'Todos', de:'Alle' },
  'dir.sort.recent': { es:'Más recientes', en:'Most recent', fr:'Plus récents', pt:'Mais recentes', de:'Neueste' },
  'dir.sort.rating': { es:'Mejor valorados', en:'Top rated', fr:'Mieux notés', pt:'Melhor avaliados', de:'Bestbewertet' },
  'dir.sort.popular':{ es:'Más populares', en:'Most popular', fr:'Plus populaires', pt:'Mais populares', de:'Beliebteste' },
  // Business card
  'biz.reviews': { es:'reseñas', en:'reviews', fr:'avis', pt:'avaliações', de:'Bewertungen' },
  'biz.open':    { es:'Abierto', en:'Open', fr:'Ouvert', pt:'Aberto', de:'Geöffnet' },
  'biz.closed':  { es:'Cerrado', en:'Closed', fr:'Fermé', pt:'Fechado', de:'Geschlossen' },
  'biz.new':     { es:'Nuevo', en:'New', fr:'Nouveau', pt:'Novo', de:'Neu' },
  'biz.featured':{ es:'Destacado', en:'Featured', fr:'Vedette', pt:'Destaque', de:'Empfohlen' },
  'biz.viewprofile': { es:'Ver perfil', en:'View profile', fr:'Voir le profil', pt:'Ver perfil', de:'Profil anzeigen' },
  'biz.contact': { es:'Contactar', en:'Contact', fr:'Contacter', pt:'Contatar', de:'Kontaktieren' },
  'biz.save':    { es:'Guardar', en:'Save', fr:'Enregistrer', pt:'Salvar', de:'Speichern' },
  // Settings
  'sett.title':     { es:'Ajustes', en:'Settings', fr:'Paramètres', pt:'Configurações', de:'Einstellungen' },
  'sett.lang.title':{ es:'Idioma', en:'Language', fr:'Langue', pt:'Idioma', de:'Sprache' },
  'sett.lang.label':{ es:'Idioma de la interfaz', en:'Interface language', fr:'Langue de l\'interface', pt:'Idioma da interface', de:'Oberflächensprache' },
  // Misc
  'search.placeholder': { es:'Buscar un chat...', en:'Search a chat...', fr:'Rechercher un chat...', pt:'Buscar um chat...', de:'Chat suchen...' },
  'msg.new':   { es:'Nuevo mensaje', en:'New message', fr:'Nouveau message', pt:'Nova mensagem', de:'Neue Nachricht' },
  'empty.fav': { es:'Sin favoritos', en:'No favorites', fr:'Pas de favoris', pt:'Sem favoritos', de:'Keine Favoriten' },
  'empty.fav.sub': { es:'Guarda tus chats favoritos aquí.', en:'Save your favorite chats here.', fr:'Enregistrez vos chats favoris ici.', pt:'Salve seus chats favoritos aqui.', de:'Speichere deine Lieblingschats hier.' },
  'chat.write': { es:'Escribe un mensaje...', en:'Write a message...', fr:'Écrivez un message...', pt:'Escreva uma mensagem...', de:'Nachricht schreiben...' },
  'notif.title': { es:'Notificaciones', en:'Notifications', fr:'Notifications', pt:'Notificações', de:'Benachrichtigungen' },
  'tab.all':     { es:'Todos', en:'All', fr:'Tous', pt:'Todos', de:'Alle' },
  'tab.fav':     { es:'Favoritos', en:'Favorites', fr:'Favoris', pt:'Favoritos', de:'Favoriten' },
};

/** Obtiene la traducción de una clave para el idioma activo */
function t(key) {
  const lang = localStorage.getItem('fynderLang') || 'es';
  const entry = I18N[key];
  if (!entry) return key;
  return entry[lang] || entry['es'] || key;
}

/** Aplica todas las traducciones con data-i18n al DOM */
function _applyI18N() {
  const lang = localStorage.getItem('fynderLang') || 'es';
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const translation = I18N[key]?.[lang] || I18N[key]?.['es'];
    if (!translation) return;
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = translation;
    } else {
      el.textContent = translation;
    }
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.getAttribute('data-i18n-ph');
    const translation = I18N[key]?.[lang] || I18N[key]?.['es'];
    if (translation) el.placeholder = translation;
  });
  // Cambiar lang del html
  document.documentElement.lang = lang;
}

/** Aplica el idioma: guarda, actualiza UI, traduce con Google Translate */
function settApplyLanguage(langCode) {
  localStorage.setItem('fynderLang', langCode);

  const sel = document.getElementById('settLangSelect');
  if (sel) sel.value = langCode;

  const nowRow = document.getElementById('settTranslateNowRow');
  const nowSub = document.getElementById('settTranslateNowSub');
  if (nowRow) nowRow.style.display = langCode !== 'es' ? '' : 'none';
  if (nowSub) nowSub.textContent = `Idioma activo: ${LANG_NAMES[langCode] || 'Español'}`;

  _renderPreferredLangs(langCode);
  _applyI18N();

  // Intentar usar el combo de Google Translate primero (sin recargar)
  const combo = document.querySelector('.goog-te-combo');
  if (combo) {
    combo.value = langCode;
    combo.dispatchEvent(new Event('change'));
    showToast(`${_langFlag(langCode)} Idioma cambiado a ${LANG_NAMES[langCode] || langCode}`);
    return;
  }

  // Si no hay combo disponible: usar cookie + recarga (funciona con servidor web)
  if (langCode !== 'es') {
    _gtApplyViaCookie(langCode);
  } else {
    _gtRemoveTranslation();
    showToast(`🇪🇸 Idioma restaurado a Español`);
  }
}

function _initAutoTranslate() {
  const autoOn = localStorage.getItem('fynderAutoTranslate') === '1';
  const saved  = localStorage.getItem('fynderLang') || (autoOn ? _detectBrowserLang() : 'es');
  _applyI18N();
  if (autoOn && saved !== 'es') {
    localStorage.setItem('fynderLang', saved);
  }
}

function settSyncIdioma() {
  const browserLang = _detectBrowserLang();
  const saved  = localStorage.getItem('fynderLang') || browserLang;
  const autoOn = localStorage.getItem('fynderAutoTranslate') === '1';

  const sel = document.getElementById('settLangSelect');
  if (sel) sel.value = LANG_NAMES[saved] ? saved : 'es';

  const sub = document.getElementById('settLangDetectedSub');
  if (sub) sub.textContent = `Idioma del sistema: ${LANG_NAMES[browserLang] || 'Español'}`;

  const toggle = document.getElementById('settAutoTranslateToggle');
  if (toggle) toggle.classList.toggle('on', autoOn);

  const nowRow = document.getElementById('settTranslateNowRow');
  const nowSub = document.getElementById('settTranslateNowSub');
  if (nowRow) nowRow.style.display = saved !== 'es' ? '' : 'none';
  if (nowSub) nowSub.textContent = `Idioma activo: ${LANG_NAMES[saved] || 'Español'}`;

  _renderPreferredLangs(saved);
}

function _renderPreferredLangs(current) {
  const cont = document.getElementById('settPreferredLangs');
  if (!cont) return;
  const browserLang = _detectBrowserLang();
  const langs = [...new Set([current, browserLang, 'es'])].slice(0, 3);
  cont.innerHTML = langs.map((l, i) => `
    <div class="sett-row" onclick="settApplyLanguage('${l}')" style="cursor:pointer">
      <div class="sett-row-left">
        <div class="sett-row-icon" style="background:#F8FAFC;color:var(--fg);font-size:1.1rem">${_langFlag(l)}</div>
        <div>
          <span class="sett-row-label">${LANG_NAMES[l] || l}</span>
          <span class="sett-row-sub">${i===0?'Idioma activo':i===1?'Idioma del sistema':'Predeterminado'}</span>
        </div>
      </div>
      ${l===current?'<i class="fas fa-check" style="color:var(--primary)"></i>':'<i class="fas fa-chevron-right sett-row-arrow"></i>'}
    </div>`).join('');
}

function settToggleAutoTranslate() {
  const isOn   = localStorage.getItem('fynderAutoTranslate') === '1';
  const newVal = !isOn;
  localStorage.setItem('fynderAutoTranslate', newVal ? '1' : '0');
  const btn = document.getElementById('settAutoTranslateToggle');
  if (btn) btn.classList.toggle('on', newVal);
  if (newVal) {
    const detected = _detectBrowserLang();
    if (detected !== 'es') settApplyLanguage(detected);
    else showToast(`✅ Traducción automática activada`);
  } else {
    showToast('Traducción automática desactivada');
  }
}

/**
 * Aplica traducción usando la cookie de Google Translate.
 * Esto traduce la página in-place igual que el botón "Traducir" de Chrome,
 * sin redirigir al usuario a otra URL.
 */
function settApplyLanguage(langCode) {
  localStorage.setItem('fynderLang', langCode);

  // Actualizar selector en UI
  const sel = document.getElementById('settLangSelect');
  if (sel) sel.value = langCode;

  const nowRow = document.getElementById('settTranslateNowRow');
  const nowSub = document.getElementById('settTranslateNowSub');
  if (nowRow) nowRow.style.display = langCode !== 'es' ? '' : 'none';
  if (nowSub) nowSub.textContent = `Idioma activo: ${LANG_NAMES[langCode] || 'Español'}`;

  _renderPreferredLangs(langCode);

  if (langCode === 'es') {
    // Quitar traducción — restaurar original
    _gtRemoveTranslation();
    showToast('🇪🇸 Idioma restaurado a Español');
    return;
  }

  // Intentar primero con el widget embebido (más limpio)
  const combo = document.querySelector('.goog-te-combo');
  if (combo) {
    combo.value = langCode;
    combo.dispatchEvent(new Event('change'));
    showToast(`${_langFlag(langCode)} Traduciendo a ${LANG_NAMES[langCode]}...`);
    return;
  }

  // Fallback: inyectar el widget si no está listo e intentar de nuevo
  showToast(`${_langFlag(langCode)} Cargando traducción...`);
  _gtLoadAndTranslate(langCode);
}

/** Carga el widget de Google Translate si no está y aplica el idioma */
function _gtLoadAndTranslate(langCode) {
  // Asegurarse de que el elemento contenedor existe
  let el = document.getElementById('google_translate_element');
  if (!el) {
    el = document.createElement('div');
    el.id = 'google_translate_element';
    el.style.display = 'none';
    document.body.appendChild(el);
  }

  // Reinicializar el widget
  if (window.google && window.google.translate) {
    try {
      new window.google.translate.TranslateElement({
        pageLanguage: 'es',
        autoDisplay: false
      }, 'google_translate_element');
    } catch(e) {}
  }

  // Esperar hasta que el combo esté disponible (máx 4s)
  let attempts = 0;
  const poll = setInterval(() => {
    const combo = document.querySelector('.goog-te-combo');
    if (combo) {
      clearInterval(poll);
      combo.value = langCode;
      combo.dispatchEvent(new Event('change'));
      showToast(`${_langFlag(langCode)} ${LANG_NAMES[langCode]} activado ✓`);
    } else if (++attempts > 20) {
      clearInterval(poll);
      // Último recurso: iframe de traducción de Google en la misma pestaña
      _gtApplyViaCookie(langCode);
    }
  }, 200);
}

/**
 * Traduce la página al idioma especificado usando Google Translate
 */
function _gtTranslateTo(langCode) {
  if (langCode === 'es') {
    _gtRemoveTranslation();
    return;
  }
  _gtApplyViaCookie(langCode);
}

/**
 * Aplica la traducción inyectando la cookie de Google Translate
 * y recargando la página (método más compatible con archivos locales)
 */
function _gtApplyViaCookie(langCode) {
  try {
    if (!langCode || langCode === 'es') {
      _gtRemoveTranslation();
      return;
    }

    // Establecer cookie de Google Translate
    const domain = location.hostname || 'localhost';
    document.cookie = `googtrans=/es/${langCode}; path=/; domain=${domain}`;
    document.cookie = `googtrans=/es/${langCode}; path=/`;
    
    // También establecer googtrans (sin barra) que usa GT en algunos navegadores
    document.cookie = `googtrans=es|${langCode}; path=/`;
    
    showToast(`${_langFlag(langCode)} Aplicando ${LANG_NAMES[langCode]}... La página se recargará.`);
    
    // Recargar para que la cookie surta efecto
    setTimeout(() => location.reload(), 800);
  } catch(e) {
    console.error('Error aplicando traducción:', e);
    showToast('No se pudo cargar el traductor. Verifica tu conexión a internet.');
  }
}

/** Quita la traducción restaurando el idioma original */
function _gtRemoveTranslation() {
  // Limpiar cookies de Google Translate
  const domain = location.hostname || 'localhost';
  document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain}`;
  document.cookie = 'googtrans=es|es; path=/';

  const combo = document.querySelector('.goog-te-combo');
  if (combo) {
    combo.value = 'es';
    combo.dispatchEvent(new Event('change'));
    showToast('🇪🇸 Idioma restaurado a Español');
    return;
  }

  // Si no hay combo disponible, recargar para quitar traducción
  showToast('🇪🇸 Restaurando idioma español...');
  setTimeout(() => location.reload(), 600);
}

/** Inicializa la traducción automática al cargar si está activada */
function _initAutoTranslate() {
  const autoOn = localStorage.getItem('fynderAutoTranslate') === '1';
  if (!autoOn) return;
  const saved = localStorage.getItem('fynderLang') || _detectBrowserLang();
  if (saved !== 'es') {
    // Esperar a que Google Translate esté listo
    let attempts = 0;
    const poll = setInterval(() => {
      const combo = document.querySelector('.goog-te-combo');
      if (combo) {
        clearInterval(poll);
        combo.value = saved;
        combo.dispatchEvent(new Event('change'));
      } else if (++attempts > 25) {
        clearInterval(poll);
        _gtLoadAndTranslate(saved);
      }
    }, 300);
  }
}

function settSyncIdioma() {
  const browserLang = _detectBrowserLang();
  const saved = localStorage.getItem('fynderLang') || browserLang;
  const autoOn = localStorage.getItem('fynderAutoTranslate') === '1';

  const sel = document.getElementById('settLangSelect');
  if (sel) sel.value = LANG_NAMES[saved] ? saved : 'es';

  const sub = document.getElementById('settLangDetectedSub');
  if (sub) sub.textContent = `Idioma del sistema: ${LANG_NAMES[browserLang] || 'Español'}`;

  const toggle = document.getElementById('settAutoTranslateToggle');
  if (toggle) toggle.classList.toggle('on', autoOn);

  const nowRow = document.getElementById('settTranslateNowRow');
  const nowSub = document.getElementById('settTranslateNowSub');
  if (nowRow) nowRow.style.display = saved !== 'es' ? '' : 'none';
  if (nowSub) nowSub.textContent = `Idioma activo: ${LANG_NAMES[saved] || 'Español'}`;

  _renderPreferredLangs(saved);
}

function _renderPreferredLangs(current) {
  const cont = document.getElementById('settPreferredLangs');
  if (!cont) return;
  const browserLang = _detectBrowserLang();
  const langs = [...new Set([current, browserLang, 'es'])].slice(0, 3);
  cont.innerHTML = langs.map((l, i) => `
    <div class="sett-row" onclick="settApplyLanguage('${l}')" style="cursor:pointer">
      <div class="sett-row-left">
        <div class="sett-row-icon" style="background:#F8FAFC;color:var(--fg);font-size:1.1rem;font-family:serif">${_langFlag(l)}</div>
        <div>
          <span class="sett-row-label">${LANG_NAMES[l] || l}</span>
          <span class="sett-row-sub">${i === 0 ? 'Idioma activo' : i === 1 ? 'Idioma del sistema' : 'Predeterminado'}</span>
        </div>
      </div>
      ${l === current ? '<i class="fas fa-check" style="color:var(--primary)"></i>' : '<i class="fas fa-chevron-right sett-row-arrow"></i>'}
    </div>`).join('');
}

function settToggleAutoTranslate() {
  const isOn = localStorage.getItem('fynderAutoTranslate') === '1';
  const newVal = !isOn;
  localStorage.setItem('fynderAutoTranslate', newVal ? '1' : '0');

  const btn = document.getElementById('settAutoTranslateToggle');
  if (btn) btn.classList.toggle('on', newVal);

  if (newVal) {
    const detected = _detectBrowserLang();
    const saved = localStorage.getItem('fynderLang') || detected;
    showToast(`✅ Traducción automática activada — ${LANG_NAMES[detected] || 'Español'}`);
    if (saved !== 'es') settApplyLanguage(saved);
  } else {
    showToast('Traducción automática desactivada');
  }
}

function settTranslateNow() {
  const lang = localStorage.getItem('fynderLang') || _detectBrowserLang();
  settApplyLanguage(lang);
}

// ── FEEDBACK MODAL ───────────────────────────────────────────────────────────

let _feedbackStar = 0;

function openFeedbackModal() {
  _feedbackStar = 0;
  const txt = document.getElementById('feedbackText');
  if (txt) txt.value = '';
  document.querySelectorAll('.feedback-star-btn').forEach(b => b.classList.remove('selected'));
  const m = document.getElementById('feedbackModal');
  if (m) m.classList.add('open');
}

function closeFeedbackModal() {
  const m = document.getElementById('feedbackModal');
  if (m) m.classList.remove('open');
}

function setFeedbackStar(n) {
  _feedbackStar = n;
  document.querySelectorAll('.feedback-star-btn').forEach((b, i) => {
    b.classList.toggle('selected', i < n);
  });
}

function submitFeedback() {
  const txt = (document.getElementById('feedbackText')?.value || '').trim();
  if (!_feedbackStar) { showToast('Elige una valoración primero 😊'); return; }
  // Guardamos localmente (en un proyecto real iría a un servidor)
  const entry = { stars: _feedbackStar, text: txt, date: new Date().toLocaleDateString('es') };
  const prev = JSON.parse(localStorage.getItem('fynderFeedback') || '[]');
  prev.push(entry);
  localStorage.setItem('fynderFeedback', JSON.stringify(prev));
  closeFeedbackModal();
  showToast('¡Gracias por tu opinión! 🙌');
}

// ── LAYOUT WHATSAPP WEB ──────────────────────────────────────────────────────

/** Cierra el chat en desktop y muestra la pantalla de bienvenida */
function waCloseChat() {
  if (window.innerWidth >= 769) {
    _activeChatBizId = null;
    closeWaChatInfoPanel(); // Cerrar panel de info si estaba abierto
    const welcome  = document.getElementById('waWelcome');
    const chatArea = document.getElementById('waChatArea');
    if (welcome)  welcome.style.display  = 'flex';
    if (chatArea) chatArea.style.display = 'none';
    document.querySelectorAll('.msg-chat-item').forEach(el => el.classList.remove('wa-active'));
  } else {
    goPage('messages');
  }
}

/** Filtra la lista de conversaciones por texto */
function filterConversations(q) {
  // Guardar el query activo y re-renderizar respetándolo
  _convSearchQuery = (q || '').trim().toLowerCase();
  renderConversations();
}

/** Toggle emoji picker para el input móvil */
function toggleEmojiPickerMobile() {
  // Redirigir al mismo picker, pero al cerrar insertar en chatInputMobile
  const picker  = document.getElementById('emojiPicker');
  const overlay = document.getElementById('emojiOverlay');
  if (!picker) return;
  const isOpen = picker.classList.contains('open');
  if (isOpen) {
    picker.classList.remove('open');
    overlay.classList.remove('open');
    _emojiTargetId = 'chatInput';
  } else {
    _emojiTargetId = 'chatInputMobile';
    picker.classList.add('open');
    overlay.classList.add('open');
    buildEmojiPicker();
  }
}


/* ================================================================
   CHAT: DIVISOR REDIMENSIONABLE (sidebar ↔ área principal)
   ================================================================ */
(function initWaResizer() {
  document.addEventListener('DOMContentLoaded', () => {
    const handle  = document.getElementById('waResizeHandle');
    const sidebar = document.querySelector('.wa-sidebar');
    if (!handle || !sidebar) return;

    let startX = 0, startW = 0, dragging = false;

    function onMouseMove(e) {
      if (!dragging) return;
      const delta = e.clientX - startX;
      const newW  = Math.max(260, Math.min(560, startW + delta));
      sidebar.style.width = newW + 'px';
    }

    function onMouseUp() {
      if (!dragging) return;
      dragging = false;
      handle.classList.remove('resizing');
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    handle.addEventListener('mousedown', (e) => {
      if (window.innerWidth < 769) return;
      dragging = true;
      startX   = e.clientX;
      startW   = sidebar.offsetWidth;
      handle.classList.add('resizing');
      document.body.style.cursor    = 'col-resize';
      document.body.style.userSelect = 'none';
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
      e.preventDefault();
    });
  });
})();

/* ================================================================
   CHAT: BOTÓN ENVIAR / MICRÓFONO (toggle según haya texto)
   ================================================================ */
function chatInputChange() {
  const input   = document.getElementById('chatInput');
  const sendBtn = document.getElementById('chatSendBtn');
  const micBtn  = document.getElementById('chatMicBtn');
  if (!input || !sendBtn || !micBtn) return;
  const hasText = input.value.trim().length > 0;
  sendBtn.style.display = hasText ? '' : 'none';
  micBtn.style.display  = hasText ? 'none' : '';
}

// Inicializar el estado del botón al abrir un chat
(function patchChatOpen() {
  document.addEventListener('DOMContentLoaded', () => {
    // Esconder send, mostrar mic al inicio (sin texto)
    const sendBtn = document.getElementById('chatSendBtn');
    const micBtn  = document.getElementById('chatMicBtn');
    if (sendBtn) sendBtn.style.display = 'none';
    if (micBtn)  micBtn.style.display  = '';
  });
})();

/* ================================================================
   CHAT: MENÚ DE ADJUNTAR
   ================================================================ */
let _attachMenuOpen = false;

function toggleAttachMenu() {
  const menu = document.getElementById('chatAttachMenu');
  if (!menu) return;
  _attachMenuOpen = !_attachMenuOpen;
  menu.classList.toggle('open', _attachMenuOpen);
}

// Cerrar al hacer click fuera
document.addEventListener('click', (e) => {
  const wrap = document.getElementById('chatAttachWrap');
  if (wrap && !wrap.contains(e.target)) {
    const menu = document.getElementById('chatAttachMenu');
    if (menu) menu.classList.remove('open');
    _attachMenuOpen = false;
  }
});

/* ================================================================
   CHAT: ENVIAR ARCHIVOS ADJUNTOS
   ================================================================ */

/** Enviar ubicación actual como mensaje */
function sendChatLocation() {
  if (!_activeChatBizId) { showToast('Selecciona un chat primero'); return; }
  if (!localStorage.getItem('fynderLogged')) { showToast('Inicia sesión para enviar tu ubicación'); return; }
  if (!navigator.geolocation) { showToast('Tu dispositivo no soporta geolocalización'); return; }

  showToast('Obteniendo ubicación… 📍');
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { latitude: lat, longitude: lng } = pos.coords;
      const mapUrl = `https://www.google.com/maps?q=${lat},${lng}`;
      const thumb  = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=15&size=300x150&markers=${lat},${lng}&key=`;
      const now    = new Date();
      const msg = {
        id: Date.now() + Math.random(), from: 'user', text: '',
        time: _fmtTime(now), date: _fmtDate(now), read: false,
        attach: { type: 'location', lat, lng, mapUrl, thumb }
      };
      const msgs = _getMsgs(_activeChatBizId);
      msgs.push(msg);
      _saveMsgs(_activeChatBizId, msgs);
      _updateConvLastMsg(_activeChatBizId, '📍 Ubicación compartida', msg.time);
      renderConversations();
      if (window.innerWidth >= 769) renderChatMessages(_activeChatBizId);
      else renderChatMessagesMobile(_activeChatBizId);
    },
    () => showToast('No se pudo obtener la ubicación', 'error')
  );
}

/** Enviar tarjeta de contacto del usuario */
function sendChatContact() {
  if (!_activeChatBizId) { showToast('Selecciona un chat primero'); return; }
  if (!localStorage.getItem('fynderLogged')) { showToast('Inicia sesión para enviar tu contacto'); return; }
  const user = JSON.parse(localStorage.getItem('fynderUser') || 'null');
  if (!user) { showToast('No hay información de perfil', 'error'); return; }
  const name  = user.name  || 'Usuario Fynder';
  const email = user.email || '';
  const now   = new Date();
  const msg = {
    id: Date.now() + Math.random(), from: 'user', text: '',
    time: _fmtTime(now), date: _fmtDate(now), read: false,
    attach: { type: 'contact', name, email }
  };
  const msgs = _getMsgs(_activeChatBizId);
  msgs.push(msg);
  _saveMsgs(_activeChatBizId, msgs);
  _updateConvLastMsg(_activeChatBizId, '👤 Contacto compartido', msg.time);
  renderConversations();
  if (window.innerWidth >= 769) renderChatMessages(_activeChatBizId);
  else renderChatMessagesMobile(_activeChatBizId);
  showToast('Contacto enviado 👤');
}

function handleFileAttach(input, type) {
  if (!input.files || !input.files.length) return;
  if (!_activeChatBizId) { showToast('Selecciona un chat primero'); return; }
  if (!localStorage.getItem('fynderLogged')) { showToast('Inicia sesión para enviar archivos'); return; }

  // Cerrar menú
  const menu = document.getElementById('chatAttachMenu');
  if (menu) menu.classList.remove('open');
  _attachMenuOpen = false;

  Array.from(input.files).forEach(file => {
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target.result;
      const now = new Date();
      const msg = {
        id:      Date.now() + Math.random(),
        from:    'user',
        text:    '',
        time:    _fmtTime(now),
        date:    _fmtDate(now),
        read:    false,
        attach:  {
          type:  type,
          name:  file.name,
          size:  file.size,
          mime:  file.type,
          data:  dataUrl
        }
      };
      const msgs = _getMsgs(_activeChatBizId);
      msgs.push(msg);
      _saveMsgs(_activeChatBizId, msgs);
      _updateConvLastMsg(_activeChatBizId,
        type === 'media'  ? '📷 Imagen/Video' :
        type === 'audio'  ? '🎵 Audio' : '📄 Documento',
        msg.time
      );
      renderConversations();
      renderChatMessages(_activeChatBizId);
    };
    reader.readAsDataURL(file);
  });

  // Limpiar el input para permitir volver a seleccionar el mismo archivo
  input.value = '';
}

// Parchear _renderMsgsInto para mostrar archivos adjuntos
(function patchRenderMsgsInto() {
  const _orig = window._renderMsgsInto;
  // Sobreescribir directamente en el renderizador existente inyectando HTML de adjunto
  // Lo hacemos reemplazando la función global
  const _origRender = _renderMsgsInto;
  window._renderMsgsInto = function(container, bizId) {
    if (!container) return;
    const msgs = _getMsgs(bizId);
    let html = '';
    let prevDate = '';
    let prevFrom = '';

    msgs.forEach((msg, i) => {
      const isOut = (msg.from === 'user');
      const isIn  = !isOut;

      if (msg.date && msg.date !== prevDate) {
        html += `<div class="chat-date-sep">${msg.date}</div>`;
        prevDate = msg.date;
      }

      const nextMsg         = msgs[i + 1];
      const isLastInGroup   = !nextMsg  || nextMsg.from  !== msg.from;
      const isFirstInGroup  = prevFrom !== msg.from;

      const biz = BUSINESSES.find(b => String(b.id) === String(bizId));
      const bizInitial  = biz ? (biz.name || '?')[0].toUpperCase() : '?';
      const bizAvaHtml  = biz && biz.image ? `<img src="${biz.image}" alt="">` : bizInitial;
      const bizAvaBg    = biz ? _avatarColor(biz.name) : '#4a4d55';

      let avaHtml = '';
      if (isIn) {
        avaHtml = isFirstInGroup
          ? `<div class="chat-msg-ava" style="${biz && !biz.image ? 'background:'+bizAvaBg : ''}">${bizAvaHtml}</div>`
          : `<div class="chat-msg-ava" style="visibility:hidden"></div>`;
      }

      let bubbleClass = 'chat-bubble';
      if (isIn  && isLastInGroup) bubbleClass += ' chat-bubble-tail-in';
      if (!isIn && isLastInGroup) bubbleClass += ' chat-bubble-tail-out';

      const ticks = isOut ? _buildTickHtml(msg) : '';

      // Contenido del bubble (texto o adjunto)
      let content = '';
      if (msg.attach) {
        const a = msg.attach;
        if (a.type === 'media') {
          if (a.mime && a.mime.startsWith('video/')) {
            content = `<video class="chat-bubble-video" controls src="${a.data}"></video>`;
          } else {
            // imagen
            content = `<img class="chat-bubble-img" src="${a.data}" alt="${escapeHtml(a.name)}" onclick="_openImgLightbox('${a.data}','${escapeHtml(a.name)}')">`;
          }
        } else if (a.type === 'audio') {
          const uid = 'aud_' + Date.now() + '_' + i;
          content = `
            <div class="chat-bubble-audio">
              <button class="chat-bubble-audio-play" onclick="_playBubbleAudio('${uid}',this)" id="playBtn_${uid}">
                <i class="fas fa-play"></i>
              </button>
              <audio id="${uid}" src="${a.data}" onended="_audioBubbleEnded('${uid}')"></audio>
              <div class="chat-bubble-audio-bar" onclick="_seekBubbleAudio(event,'${uid}')">
                <div class="chat-bubble-audio-progress" id="prog_${uid}"></div>
              </div>
              <span class="chat-bubble-audio-dur" id="dur_${uid}">0:00</span>
            </div>`;
        } else if (a.type === 'location') {
          content = `
            <div class="chat-bubble-location" onclick="window.open('${a.mapUrl}','_blank')">
              <div class="chat-bubble-location-map">
                <i class="fas fa-location-dot"></i>
              </div>
              <div class="chat-bubble-location-label">
                <span>📍 Ubicación compartida</span>
                <span style="font-size:.7rem;opacity:.7">Toca para ver en el mapa</span>
              </div>
            </div>`;
        } else if (a.type === 'contact') {
          const initLetter = (a.name || '?')[0].toUpperCase();
          content = `
            <div class="chat-bubble-contact">
              <div class="chat-bubble-contact-av">${initLetter}</div>
              <div class="chat-bubble-contact-info">
                <span class="chat-bubble-contact-name">${escapeHtml(a.name)}</span>
                ${a.email ? `<span class="chat-bubble-contact-sub">${escapeHtml(a.email)}</span>` : ''}
              </div>
              <i class="fas fa-user-plus" style="font-size:.9rem;opacity:.6"></i>
            </div>`;
        } else {
          // documento
          const sizeKb = a.size ? Math.round(a.size / 1024) + ' KB' : '';
          const icon = _docIcon(a.mime);
          content = `
            <div class="chat-bubble-file">
              <div class="chat-bubble-file-icon"><i class="${icon}"></i></div>
              <div class="chat-bubble-file-info">
                <div class="chat-bubble-file-name">${escapeHtml(a.name)}</div>
                <div class="chat-bubble-file-size">${sizeKb}</div>
              </div>
              <a href="${a.data}" download="${escapeHtml(a.name)}" style="color:inherit;font-size:.85rem;" title="Descargar"><i class="fas fa-download"></i></a>
            </div>`;
        }
      } else {
        content = escapeHtml(msg.text);
      }

      html += `
        <div class="${isIn ? 'chat-msg-row in' : 'chat-msg-row out'}">
          ${isIn ? avaHtml : ''}
          <div>
            <div class="${bubbleClass}">
              ${content}
              <div class="chat-bubble-meta">
                <span class="chat-bubble-time">${msg.time || ''}</span>
                ${ticks}
              </div>
            </div>
          </div>
        </div>`;
      prevFrom = msg.from;
    });

    container.innerHTML = html;
    requestAnimationFrame(() => { container.scrollTop = container.scrollHeight; });

    // Iniciar duración de audios
    container.querySelectorAll('.chat-bubble-audio audio').forEach(audio => {
      const id = audio.id;
      audio.addEventListener('loadedmetadata', () => {
        const dur = document.getElementById('dur_' + id);
        if (dur) dur.textContent = _fmtAudioTime(audio.duration);
      });
      audio.addEventListener('timeupdate', () => {
        const prog = document.getElementById('prog_' + id);
        const dur  = document.getElementById('dur_' + id);
        if (prog && audio.duration) prog.style.width = (audio.currentTime / audio.duration * 100) + '%';
        if (dur) dur.textContent = _fmtAudioTime(audio.currentTime);
      });
    });
  };
})();

function _docIcon(mime) {
  if (!mime) return 'fas fa-file';
  if (mime.includes('pdf'))   return 'fas fa-file-pdf';
  if (mime.includes('word') || mime.includes('document')) return 'fas fa-file-word';
  if (mime.includes('sheet') || mime.includes('excel'))   return 'fas fa-file-excel';
  if (mime.includes('presentation') || mime.includes('powerpoint')) return 'fas fa-file-powerpoint';
  if (mime.includes('zip') || mime.includes('rar'))       return 'fas fa-file-zipper';
  if (mime.includes('text')) return 'fas fa-file-lines';
  return 'fas fa-file';
}

function _fmtAudioTime(secs) {
  if (!isFinite(secs)) return '0:00';
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return m + ':' + String(s).padStart(2, '0');
}

function _playBubbleAudio(id, btn) {
  const audio = document.getElementById(id);
  if (!audio) return;
  if (audio.paused) {
    // Pausar cualquier otro audio en reproducción
    document.querySelectorAll('.chat-bubble-audio audio').forEach(a => {
      if (a !== audio && !a.paused) {
        a.pause();
        const b = document.getElementById('playBtn_' + a.id);
        if (b) b.innerHTML = '<i class="fas fa-play"></i>';
      }
    });
    audio.play();
    btn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    audio.pause();
    btn.innerHTML = '<i class="fas fa-play"></i>';
  }
}

function _audioBubbleEnded(id) {
  const btn = document.getElementById('playBtn_' + id);
  if (btn) btn.innerHTML = '<i class="fas fa-play"></i>';
  const prog = document.getElementById('prog_' + id);
  if (prog) prog.style.width = '0%';
}

function _seekBubbleAudio(event, id) {
  const audio = document.getElementById(id);
  const bar   = event.currentTarget;
  if (!audio || !bar) return;
  const rect = bar.getBoundingClientRect();
  const ratio = (event.clientX - rect.left) / rect.width;
  audio.currentTime = ratio * audio.duration;
}

function _openImgLightbox(src, caption) {
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.9);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;cursor:zoom-out;';
  overlay.onclick = () => overlay.remove();
  overlay.innerHTML = `
    <img src="${src}" style="max-width:92vw;max-height:82dvh;border-radius:12px;object-fit:contain;box-shadow:0 8px 40px rgba(0,0,0,.6);" loading="lazy" onclick="event.stopPropagation()">
    <p style="color:rgba(255,255,255,.6);font-size:.8rem;font-family:'Inter',sans-serif;margin:0;">${caption} · Clic para cerrar</p>`;
  document.body.appendChild(overlay);
}

/* ================================================================
   CHAT: GRABACIÓN DE AUDIO (micrófono)
   ================================================================ */
let _mediaRecorder  = null;
let _audioChunks    = [];
let _recordTimer    = null;
let _recordSeconds  = 0;
let _isRecording    = false;

function toggleAudioRecord() {
  if (_isRecording) {
    stopAndSendAudio();
  } else {
    startAudioRecord();
  }
}

async function startAudioRecord() {
  if (!_activeChatBizId) { showToast('Selecciona un chat primero'); return; }
  if (!localStorage.getItem('fynderLogged')) { showToast('Inicia sesión para enviar audios'); return; }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    _audioChunks = [];
    _mediaRecorder = new MediaRecorder(stream);
    _mediaRecorder.ondataavailable = (e) => { if (e.data.size > 0) _audioChunks.push(e.data); };
    _mediaRecorder.onstop = _onRecordStop;
    _mediaRecorder.start();
    _isRecording = true;

    // Mostrar barra de grabación
    const micBtn    = document.getElementById('chatMicBtn');
    const inputBar  = document.querySelector('.chat-input-bar.wa-input-bar');
    const recordBar = document.getElementById('chatRecordBar');
    if (micBtn)   micBtn.classList.add('chat-mic-recording');
    if (inputBar) inputBar.style.display = 'none';
    if (recordBar) recordBar.style.display = 'flex';

    // Temporizador
    _recordSeconds = 0;
    _updateRecordTime();
    _recordTimer = setInterval(() => {
      _recordSeconds++;
      _updateRecordTime();
      // Límite de 5 minutos
      if (_recordSeconds >= 300) stopAndSendAudio();
    }, 1000);

  } catch (err) {
    if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
      showToast('Permiso de micrófono denegado. Actívalo en la configuración del navegador.');
    } else {
      showToast('No se pudo acceder al micrófono: ' + err.message);
    }
  }
}

function stopAndSendAudio() {
  if (!_mediaRecorder || !_isRecording) return;
  _isRecording = false;
  clearInterval(_recordTimer);
  _mediaRecorder.stop();
  // Detener pistas del stream
  if (_mediaRecorder.stream) {
    _mediaRecorder.stream.getTracks().forEach(t => t.stop());
  }
  _hideRecordBar();
}

function cancelAudioRecord() {
  if (_mediaRecorder && _isRecording) {
    _isRecording = false;
    clearInterval(_recordTimer);
    _mediaRecorder.onstop = null; // no enviar
    _mediaRecorder.stop();
    if (_mediaRecorder.stream) {
      _mediaRecorder.stream.getTracks().forEach(t => t.stop());
    }
  }
  _audioChunks = [];
  _hideRecordBar();
  showToast('Grabación cancelada');
}

function _hideRecordBar() {
  const micBtn    = document.getElementById('chatMicBtn');
  const inputBar  = document.querySelector('.chat-input-bar.wa-input-bar');
  const recordBar = document.getElementById('chatRecordBar');
  if (micBtn)   micBtn.classList.remove('chat-mic-recording');
  if (inputBar) inputBar.style.display = '';
  if (recordBar) recordBar.style.display = 'none';
  _updateRecordTime();
}

function _updateRecordTime() {
  const el = document.getElementById('chatRecordTime');
  if (el) el.textContent = _fmtAudioTime(_recordSeconds);
}

function _onRecordStop() {
  if (!_isRecording && _audioChunks.length === 0) return; // cancelado
  const blob  = new Blob(_audioChunks, { type: 'audio/webm' });
  const reader = new FileReader();
  reader.onload = (ev) => {
    const dataUrl = ev.target.result;
    const now = new Date();
    const msg = {
      id:   Date.now(),
      from: 'user',
      text: '',
      time: _fmtTime(now),
      date: _fmtDate(now),
      read: false,
      attach: {
        type: 'audio',
        name: 'Audio_' + _fmtTime(now).replace(':','') + '.webm',
        size: blob.size,
        mime: 'audio/webm',
        data: dataUrl
      }
    };
    const msgs = _getMsgs(_activeChatBizId);
    msgs.push(msg);
    _saveMsgs(_activeChatBizId, msgs);
    _updateConvLastMsg(_activeChatBizId, '🎤 Audio', msg.time);
    renderConversations();
    renderChatMessages(_activeChatBizId);
  };
  reader.readAsDataURL(blob);
  _audioChunks = [];
}

/* ================================================================
   CHAT: ESTADO DE MENSAJES — TICKS ESTILO WHATSAPP
   pending   → reloj        (esperando envío / sin conexión)
   sent      → ✓ gris       (llegó al servidor)
   delivered → ✓✓ gris      (entregado al destinatario)
   read      → ✓✓ azul      (leído)
   ================================================================ */
function _buildTickHtml(msg) {
  // Compatibilidad con mensajes anteriores que usan msg.read
  const status = msg.status || (msg.read ? 'read' : 'delivered');

  if (status === 'pending') {
    return `<span class="chat-bubble-tick tick-pending" title="Enviando...">
      <i class="fas fa-clock"></i>
    </span>`;
  }
  if (status === 'sent') {
    return `<span class="chat-bubble-tick tick-sent" title="Enviado">
      <i class="fas fa-check"></i>
    </span>`;
  }
  if (status === 'delivered') {
    return `<span class="chat-bubble-tick tick-delivered" title="Entregado">
      <i class="fas fa-check-double"></i>
    </span>`;
  }
  // read
  return `<span class="chat-bubble-tick tick-read" title="Leído">
    <i class="fas fa-check-double"></i>
  </span>`;
}

/* ================================================================
   CHAT: DIVISOR REDIMENSIONABLE — RANGO AMPLIADO
   Min: 200px  |  Max: 65% del viewport
   ================================================================ */
// Parchar el resizer existente para ampliar los límites
(function patchWaResizer() {
  document.addEventListener('DOMContentLoaded', () => {
    const handle  = document.getElementById('waResizeHandle');
    const sidebar = document.querySelector('.wa-sidebar');
    if (!handle || !sidebar) return;

    // Eliminar listeners anteriores clonando el nodo
    const newHandle = handle.cloneNode(true);
    handle.parentNode.replaceChild(newHandle, handle);

    let startX = 0, startW = 0, dragging = false;

    function clamp(val) {
      const min = 200;
      const max = Math.round(window.innerWidth * 0.65);
      return Math.max(min, Math.min(max, val));
    }

    function onMouseMove(e) {
      if (!dragging) return;
      const newW = clamp(startW + (e.clientX - startX));
      sidebar.style.width    = newW + 'px';
      sidebar.style.minWidth = newW + 'px';
      sidebar.style.maxWidth = newW + 'px';
    }

    function onMouseUp() {
      if (!dragging) return;
      dragging = false;
      newHandle.classList.remove('resizing');
      document.body.style.cursor     = '';
      document.body.style.userSelect = '';
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup',   onMouseUp);
    }

    newHandle.addEventListener('mousedown', (e) => {
      if (window.innerWidth < 769) return;
      dragging = true;
      startX   = e.clientX;
      startW   = sidebar.offsetWidth;
      newHandle.classList.add('resizing');
      document.body.style.cursor     = 'col-resize';
      document.body.style.userSelect = 'none';
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup',   onMouseUp);
      e.preventDefault();
    });
  });
})();

/* ================================================================
   CHAT HEADER: funciones de los botones
   ================================================================ */

/** Llamar al teléfono del negocio si está disponible */
function waChatCall() {
  if (!_activeChatBizId) return;
  const biz = BUSINESSES.find(b => String(b.id) === String(_activeChatBizId));
  if (!biz) return;
  const phone = biz.phone || biz.whatsapp || biz.contact;
  if (phone) {
    const clean = String(phone).replace(/\D/g, '');
    window.open('tel:+' + clean, '_self');
  } else {
    showToast('Este negocio no tiene número de teléfono registrado 📵');
  }
}

/** Abrir/cerrar el menú contextual del header del chat */
let _waChatCtxOpen = false;
function toggleWaChatMenu(btn) {
  const menu = document.getElementById('waChatCtxMenu');
  if (!menu) return;
  _waChatCtxOpen = !_waChatCtxOpen;
  menu.style.display = _waChatCtxOpen ? 'flex' : 'none';
  // Actualizar label de silencio según estado actual
  if (_waChatCtxOpen && _activeChatBizId) {
    const muted = JSON.parse(localStorage.getItem('fynderMutedChats') || '[]');
    const isMuted = muted.includes(String(_activeChatBizId));
    const muteBtn = document.getElementById('waChatMuteBtn');
    if (muteBtn) muteBtn.innerHTML = `<i class="fas fa-bell${isMuted ? '' : '-slash'}"></i> ${isMuted ? 'Activar notificaciones' : 'Silenciar notificaciones'}`;
  }
}
function closeWaChatMenu() {
  const menu = document.getElementById('waChatCtxMenu');
  if (menu) menu.style.display = 'none';
  _waChatCtxOpen = false;
}
// Cerrar al hacer click fuera
document.addEventListener('click', (e) => {
  const menu = document.getElementById('waChatCtxMenu');
  if (!menu || menu.style.display === 'none') return;
  const area = document.getElementById('waChatArea');
  if (area && !area.querySelector('.wa-chat-header-actions').contains(e.target) && !menu.contains(e.target)) {
    closeWaChatMenu();
  }
});

/** Búsqueda dentro del chat (resalta mensajes que contienen el texto) */
function waChatSearch() {
  const q = prompt('Buscar en el chat:');
  if (!q || !q.trim()) return;
  const term = q.trim().toLowerCase();
  const bubbles = document.querySelectorAll('#chatMessages .chat-bubble');
  let found = 0;
  bubbles.forEach(b => {
    const txt = b.textContent.toLowerCase();
    b.style.outline = txt.includes(term) ? '2px solid var(--msg-accent)' : '';
    if (txt.includes(term)) found++;
  });
  if (found === 0) {
    showToast('No se encontraron mensajes con "' + q + '"');
  } else {
    showToast(`${found} mensaje${found > 1 ? 's' : ''} encontrado${found > 1 ? 's' : ''}`);
    // Scroll al primero encontrado
    const first = document.querySelector('#chatMessages .chat-bubble[style*="outline"]');
    if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' });
    // Limpiar resaltado después de 3 segundos
    setTimeout(() => {
      document.querySelectorAll('#chatMessages .chat-bubble').forEach(b => b.style.outline = '');
    }, 3000);
  }
}

/** Exportar solo el chat activo */
function exportThisChat() {
  if (!_activeChatBizId) return;
  const biz  = BUSINESSES.find(b => String(b.id) === String(_activeChatBizId));
  const name = biz ? biz.name : 'Negocio';
  const msgs = _getMsgs(_activeChatBizId);
  if (!msgs.length) { showToast('No hay mensajes para exportar'); return; }
  let txt = `Chat con ${name} — Fynder\n${'='.repeat(40)}\n\n`;
  msgs.forEach(m => {
    const who = m.from === 'user' ? 'Yo' : name;
    txt += `[${m.date} ${m.time}] ${who}: ${m.text || (m.attach ? '[Archivo adjunto]' : '')}\n`;
  });
  const blob = new Blob([txt], { type: 'text/plain;charset=utf-8' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url; a.download = `chat-${name.replace(/\s+/g,'-')}.txt`; a.click();
  URL.revokeObjectURL(url);
  showToast('Chat exportado ✅');
}

/** Borrar mensajes del chat activo */
function clearThisChat() {
  if (!_activeChatBizId) return;
  const biz  = BUSINESSES.find(b => String(b.id) === String(_activeChatBizId));
  const name = biz ? biz.name : 'este negocio';
  if (!confirm(`¿Vaciar todos los mensajes con ${name}?`)) return;
  _saveMsgs(_activeChatBizId, []);
  const convs = _getConversations();
  const idx   = convs.findIndex(c => String(c.id) === String(_activeChatBizId));
  if (idx > -1) { convs[idx].lastMsg = ''; convs[idx].lastTime = ''; _saveConversations(convs); }
  renderConversations();
  renderChatMessages(_activeChatBizId);
  showToast('Chat vaciado');
}

/** Eliminar la conversación completa (quita de la lista) */
function deleteThisConversation() {
  if (!_activeChatBizId) return;
  const biz  = BUSINESSES.find(b => String(b.id) === String(_activeChatBizId));
  const name = biz ? biz.name : 'este negocio';
  if (!confirm(`¿Eliminar el chat con ${name}? Se borrarán todos los mensajes.`)) return;
  // Borrar mensajes y conversación
  _saveMsgs(_activeChatBizId, []);
  const convs = _getConversations().filter(c => String(c.id) !== String(_activeChatBizId));
  _saveConversations(convs);
  _activeChatBizId = null;
  // Volver a la pantalla de bienvenida del chat
  const welcome  = document.getElementById('waWelcome');
  const chatArea = document.getElementById('waChatArea');
  if (welcome)  welcome.style.display  = 'flex';
  if (chatArea) chatArea.style.display = 'none';
  renderConversations();
  updateMsgBadge();
  showToast('Chat eliminado');
}

/** Silenciar / activar notificaciones del chat activo */
function toggleChatMute() {
  if (!_activeChatBizId) return;
  const key    = 'fynderMutedChats';
  const muted  = JSON.parse(localStorage.getItem(key) || '[]');
  const id     = String(_activeChatBizId);
  const isMuted = muted.includes(id);
  if (isMuted) {
    localStorage.setItem(key, JSON.stringify(muted.filter(x => x !== id)));
    showToast('Notificaciones activadas 🔔');
  } else {
    muted.push(id);
    localStorage.setItem(key, JSON.stringify(muted));
    showToast('Notificaciones silenciadas 🔕');
  }
  // Actualizar label del botón si está visible
  const btn = document.getElementById('waChatMuteBtn');
  if (btn) {
    const nowMuted = !isMuted;
    btn.innerHTML = `<i class="fas fa-bell${nowMuted ? '' : '-slash'}"></i> ${nowMuted ? 'Activar notificaciones' : 'Silenciar notificaciones'}`;
  }
}

/* ================================================================
   CHAT PROFILE: botones funcionales
   ================================================================ */

/** Flecha atrás — vuelve al chat si estaba activo, si no a mensajes */
function cproGoBack() {
  if (_activeChatBizId) {
    if (window.innerWidth >= 769) {
      goPage('messages');
    } else {
      goPage('chat');
    }
  } else {
    goPage('messages');
  }
}

/** Llamar al negocio */
function cproCall() {
  if (!_activeChatBizId) return;
  const biz = BUSINESSES.find(b => String(b.id) === String(_activeChatBizId));
  if (!biz) return;
  const phone = biz.phone || biz.whatsapp;
  if (phone) {
    const clean = String(phone).replace(/[\s\-\(\)]/g, '');
    window.location.href = 'tel:' + clean;
  } else {
    showToast('Este negocio no tiene número de teléfono registrado 📵');
  }
}

/** Buscar en el chat activo */
function cproSearchInChat() {
  const q = prompt('Buscar en el chat con ' + (document.getElementById('cproName')?.textContent || 'este negocio') + ':');
  if (!q || !q.trim() || !_activeChatBizId) return;
  const term = q.trim().toLowerCase();
  const msgs = _getMsgs(_activeChatBizId);
  const matches = msgs.filter(m => m.text && m.text.toLowerCase().includes(term));
  if (!matches.length) {
    showToast(`No se encontraron mensajes con "${q}"`);
    return;
  }
  showToast(`${matches.length} mensaje${matches.length > 1 ? 's' : ''} encontrado${matches.length > 1 ? 's' : ''}`);
  // Volver al chat y resaltar
  cproGoBack();
  setTimeout(() => {
    const bubbles = document.querySelectorAll('#chatMessages .chat-bubble');
    bubbles.forEach(b => {
      b.style.outline = b.textContent.toLowerCase().includes(term)
        ? '2px solid var(--msg-accent)'
        : '';
    });
    const first = document.querySelector('#chatMessages .chat-bubble[style*="outline"]');
    if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => {
      document.querySelectorAll('#chatMessages .chat-bubble').forEach(b => b.style.outline = '');
    }, 3500);
  }, 350);
}

/** Ver mapa — con fallback a address si no hay mapQuery */
function openChatProfileMap() {
  if (!_activeChatBizId) return;
  const biz = BUSINESSES.find(b => String(b.id) === String(_activeChatBizId));
  if (!biz) { showToast('Negocio no encontrado'); return; }
  const query = biz.mapQuery || biz.address;
  if (query) {
    window.open('https://maps.google.com/?q=' + encodeURIComponent(query.replace(/\+/g, ' ')), '_blank');
  } else {
    showToast('Ubicación no disponible para este negocio 📍');
  }
}

/** Contactar por WhatsApp */
function cproWhatsApp() {
  if (!_activeChatBizId) return;
  const biz = BUSINESSES.find(b => String(b.id) === String(_activeChatBizId));
  if (!biz) return;
  const wa = biz.whatsapp || biz.phone;
  if (wa) {
    const clean = String(wa).replace(/[\s\-\(\)\+]/g, '');
    window.open('https://wa.me/' + clean, '_blank');
  } else {
    showToast('WhatsApp no disponible para este negocio');
  }
}

/** Compartir el perfil del negocio */
function cproShareProfile() {
  if (!_activeChatBizId) return;
  const biz = BUSINESSES.find(b => String(b.id) === String(_activeChatBizId));
  const name = biz ? biz.name : 'este negocio';
  const text = `¡Descubrí ${name} en Fynder! 🚀 Encuéntralo en la app.`;
  if (navigator.share) {
    navigator.share({ title: name, text: text, url: window.location.href })
      .catch(() => {});
  } else {
    navigator.clipboard.writeText(text).then(() => {
      showToast('¡Enlace copiado al portapapeles! 📋');
    }).catch(() => {
      showToast('No se pudo compartir en este navegador');
    });
  }
}

/** Menú contextual del ⋮ del perfil */
let _cproMenuOpen = false;
function toggleCproMenu(btn) {
  const menu = document.getElementById('cproCtxMenu');
  if (!menu) return;
  _cproMenuOpen = !_cproMenuOpen;
  menu.style.display = _cproMenuOpen ? 'flex' : 'none';
}
function closeCproMenu() {
  const menu = document.getElementById('cproCtxMenu');
  if (menu) menu.style.display = 'none';
  _cproMenuOpen = false;
}
// Cerrar al hacer click fuera
document.addEventListener('click', (e) => {
  const menu = document.getElementById('cproCtxMenu');
  const btn  = document.getElementById('cproMenuBtn');
  if (!menu || menu.style.display === 'none') return;
  if (btn && btn.contains(e.target)) return;
  if (!menu.contains(e.target)) closeCproMenu();
});

/* ================================================================
   RAIL DE ÍCONOS: lógica de navegación y avatar
   ================================================================ */

/** Cambia la sección activa del rail */
function waRailSwitch(section, btn) {
  // Quitar activo de todos los botones del rail
  document.querySelectorAll('.wa-rail-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  // Sincronizar con las tabs y paneles existentes
  if (section === 'chats') {
    if (typeof msgSwitchTab === 'function') msgSwitchTab('chats');
  } else if (section === 'bookmarks') {
    if (typeof msgSwitchTab === 'function') msgSwitchTab('bookmarks');
  } else if (section === 'notif') {
    if (typeof msgSwitchSection === 'function') msgSwitchSection('notif');
  }
}

/** Sincroniza el avatar del usuario en el rail */
function waRailSyncAvatar() {
  const btn = document.getElementById('waRailAvatar');
  if (!btn) return;
  const photo  = localStorage.getItem('fynderAvatarPhoto');
  const preset = localStorage.getItem('fynderAvatarPreset');
  const user   = JSON.parse(localStorage.getItem('fynderUser') || '{}');
  const initial = (user.name || 'U')[0].toUpperCase();
  const bg = localStorage.getItem('fynderAvatarInitialBg') || '#67B8B4';

  if (photo) {
    btn.innerHTML = `<img src="${photo}" alt="avatar" style="width:36px;height:36px;object-fit:cover;border-radius:50%;">`;
  } else if (preset) {
    btn.innerHTML = `<span style="font-size:1.3rem">${preset}</span>`;
  } else if (user.name) {
    btn.innerHTML = `<span style="width:32px;height:32px;border-radius:50%;background:${bg};display:flex;align-items:center;justify-content:center;font-size:.85rem;font-weight:700;color:#fff;font-family:'Poppins',sans-serif;">${initial}</span>`;
  } else {
    btn.innerHTML = '<i class="fas fa-user-circle"></i>';
  }
}

/** Actualiza el badge de mensajes no leídos en el rail */
function waRailUpdateBadge() {
  const badge = document.getElementById('railBadgeChats');
  const navBadge = document.getElementById('navMsgBadge');
  if (!badge) return;
  const count = navBadge ? (parseInt(navBadge.textContent) || 0) : 0;
  if (count > 0) {
    badge.textContent = count > 99 ? '99+' : count;
    badge.style.display = 'flex';
  } else {
    badge.style.display = 'none';
  }
}

// Inicializar el rail cuando se abre la página de mensajes
document.addEventListener('DOMContentLoaded', () => {
  // Parchear goPage para sincronizar el rail al entrar a mensajes
  const _origGoPageRail = window.goPage;
  if (_origGoPageRail) {
    const _patchedGoPage = function(p) {
      _origGoPageRail(p);
      if (p === 'messages') {
        waRailSyncAvatar();
        waRailUpdateBadge();
        // Marcar chats como activo en el rail
        document.querySelectorAll('.wa-rail-btn').forEach(b => b.classList.remove('active'));
        const railChats = document.getElementById('railBtnChats');
        if (railChats) railChats.classList.add('active');
      }
    };
    // Solo parchear si no fue ya parcheado
    if (!window._waRailPatched) {
      window._waRailPatched = true;
      window.goPage = _patchedGoPage;
    }
  }
});

/* ================================================================
   AJUSTES DEL CHAT: modo oscuro y fondo del chat
   ================================================================ */

/** Toggle modo oscuro/día desde el panel de ajustes del chat */
function msgToggleTheme() {
  toggleDarkMode(); // usa la función global existente
  _syncMsgSettingsTheme();
}

/** Sincroniza el toggle y label del tema en el panel */
function _syncMsgSettingsTheme() {
  const isDark   = document.documentElement.getAttribute('data-theme') === 'dark';
  const toggle   = document.getElementById('settingThemeToggle');
  const sub      = document.getElementById('settingThemeSub');
  const icon     = document.getElementById('settingThemeIcon');

  if (toggle) toggle.classList.toggle('on', isDark);
  if (sub)    sub.textContent    = isDark ? 'Tema actual: oscuro' : 'Tema actual: claro';
  if (icon)   icon.innerHTML     = isDark
    ? '<i class="fas fa-moon"></i>'
    : '<i class="fas fa-sun" style="color:#F4D35E"></i>';
}

/** Toggle genérico de ajustes del chat (online, etc.) */
function msgToggleSetting(key, btnId) {
  const lsKey  = 'fynderMsgOpt_' + key;
  const btn    = document.getElementById(btnId);
  const isOn   = btn ? btn.classList.contains('on') : localStorage.getItem(lsKey) !== '0';
  const newVal = !isOn;
  localStorage.setItem(lsKey, newVal ? '1' : '0');
  if (btn) btn.classList.toggle('on', newVal);
  showToast(newVal ? 'Activado' : 'Desactivado');
}

/** Cambiar fondo del chat */
function setChatWallpaper(wp, btn) {
  // Quitar clases anteriores del área de mensajes
  const msgs1 = document.getElementById('chatMessages');
  const msgs2 = document.getElementById('chatMessagesMobile');
  [msgs1, msgs2].forEach(el => {
    if (!el) return;
    el.classList.remove('wp-dots', 'wp-gradient', 'wp-dark', 'wp-nature');
    if (wp !== 'default') el.classList.add('wp-' + wp);
  });

  // Guardar preferencia
  localStorage.setItem('fynderChatWallpaper', wp);

  // Actualizar dots activos
  document.querySelectorAll('.msg-wallpaper-dot').forEach(d => d.classList.remove('active'));
  if (btn) btn.classList.add('active');

  // Actualizar sub-label
  const wpLabels = { default:'Patrón por defecto', dots:'Puntos', gradient:'Gradiente', dark:'Oscuro total', nature:'Verde' };
  const sub = document.getElementById('settingWallpaperSub');
  if (sub) sub.textContent = wpLabels[wp] || wp;

  showToast('Fondo actualizado');
}

/** Restaurar fondo del chat al cargar */
function _restoreChatWallpaper() {
  const wp = localStorage.getItem('fynderChatWallpaper') || 'default';
  const msgs1 = document.getElementById('chatMessages');
  const msgs2 = document.getElementById('chatMessagesMobile');
  [msgs1, msgs2].forEach(el => {
    if (!el) return;
    el.classList.remove('wp-dots', 'wp-gradient', 'wp-dark', 'wp-nature');
    if (wp !== 'default') el.classList.add('wp-' + wp);
  });

  // Sync dots en el panel
  document.querySelectorAll('.msg-wallpaper-dot').forEach(d => {
    d.classList.toggle('active', d.dataset.wp === wp);
  });
  const wpLabels = { default:'Patrón por defecto', dots:'Puntos', gradient:'Gradiente', dark:'Oscuro total', nature:'Verde' };
  const sub = document.getElementById('settingWallpaperSub');
  if (sub) sub.textContent = wpLabels[wp] || wp;
}

// Parchear openMsgSettings para sincronizar el tema y wallpaper al abrir
const _origOpenMsgSettings = window.openMsgSettings;
window.openMsgSettings = function() {
  if (_origOpenMsgSettings) _origOpenMsgSettings();
  _syncMsgSettingsTheme();
  _restoreChatWallpaper();
};

// Restaurar wallpaper al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  _restoreChatWallpaper();
  _syncMsgSettingsTheme();
});

// ============================================================
//  HEADER CHATS — Menú de tres puntitos (dropdown)
// ============================================================

let _msgHeaderMenuOpen = false;

function toggleMsgHeaderMenu() {
  const dd = document.getElementById('msgHeaderDropdown');
  if (!dd) return;
  _msgHeaderMenuOpen = !_msgHeaderMenuOpen;
  dd.style.display = _msgHeaderMenuOpen ? 'block' : 'none';
  if (_msgHeaderMenuOpen) {
    setTimeout(() => {
      document.addEventListener('click', _closeMsgHeaderMenuOutside, { once: true });
    }, 10);
  }
}

function closeMsgHeaderMenu() {
  const dd = document.getElementById('msgHeaderDropdown');
  if (dd) dd.style.display = 'none';
  _msgHeaderMenuOpen = false;
}

function _closeMsgHeaderMenuOutside(e) {
  const wrap = document.getElementById('msgHeaderMenuWrap');
  if (wrap && wrap.contains(e.target)) return;
  closeMsgHeaderMenu();
}

/** Marca todos los chats como leídos (limpia badges) */
function msgMarkAllRead() {
  const convs = _getConversations();
  convs.forEach(c => {
    c.unread = 0;
    const msgs = _getMsgs(c.bizId);
    msgs.forEach(m => { m.read = true; });
    _saveMsgs(c.bizId, msgs);
  });
  _saveConversations(convs);
  renderConversations();
  updateMsgBadge();
  showToast('✅ Todos los chats marcados como leídos');
}

/** Ordena los chats por criterio */
function msgSortChats(by) {
  const convs = _getConversations();
  if (by === 'unread') {
    convs.sort((a, b) => (b.unread || 0) - (a.unread || 0));
  } else {
    // recent: orden por timestamp del último mensaje
    convs.sort((a, b) => (b.lastTime || 0) - (a.lastTime || 0));
  }
  _saveConversations(convs);
  renderConversations();
  showToast(by === 'unread' ? '📬 Ordenado por no leídos' : '🕐 Ordenado por recientes');
}

/** Limpia todo el historial de chats (pide confirmación) */
function msgClearAllChats() {
  if (!confirm('¿Limpiar todo el historial de chats? Esta acción no se puede deshacer.')) return;
  const convs = _getConversations();
  convs.forEach(c => {
    localStorage.removeItem('fynderChat_' + c.id);
  });
  _saveConversations([]);
  renderConversations();
  showToast('🗑️ Historial eliminado');
}

// ============================================================
//  BOTÓN LÁPIZ — Modal "Nuevo chat"
// ============================================================

function openNewChatModal() {
  const overlay = document.getElementById('newChatOverlay');
  const modal   = document.getElementById('newChatModal');
  const input   = document.getElementById('newChatSearchInput');
  if (!overlay || !modal) return;
  overlay.style.display = 'block';
  modal.style.display   = 'flex';
  _renderNewChatList('');
  if (input) { input.value = ''; input.focus(); }
}

function closeNewChatModal() {
  document.getElementById('newChatOverlay').style.display = 'none';
  document.getElementById('newChatModal').style.display   = 'none';
}

function filterNewChatList(q) {
  _renderNewChatList(q);
}

function _renderNewChatList(q) {
  const list = document.getElementById('newChatList');
  if (!list) return;
  const term = (q || '').trim().toLowerCase();

  // Negocios con los que ya hay conversación
  const existingIds = new Set(_getConversations().map(c => String(c.bizId)));

  let businesses = BUSINESSES;
  if (term) {
    businesses = businesses.filter(b =>
      b.name.toLowerCase().includes(term) ||
      (b.category || '').toLowerCase().includes(term)
    );
  }

  if (businesses.length === 0) {
    list.innerHTML = `<div class="msg-newchat-empty"><i class="fas fa-search"></i><p>Sin resultados para "${q}"</p></div>`;
    return;
  }

  list.innerHTML = businesses.map(b => {
    const hasChat = existingIds.has(String(b.id));
    const cat     = CATEGORIES.find(c => c.id === b.category);
    const stars   = b.rating ? '⭐ ' + b.rating.toFixed(1) : '';
    return `
      <div class="msg-newchat-item" onclick="closeNewChatModal();openChatById(${b.id})">
        <div class="msg-newchat-avatar" style="background:${cat ? cat.color + '22' : '#eee'}">
          ${b.image
            ? `<img src="${b.image}" alt="${b.name}" style="width:100%;height:100%;object-fit:cover;border-radius:50%">`
            : `<span style="font-weight:700;color:${cat ? cat.color : '#555'};font-size:1rem">${b.name.charAt(0)}</span>`
          }
        </div>
        <div class="msg-newchat-info">
          <span class="msg-newchat-name">${b.name}</span>
          <span class="msg-newchat-meta">${cat ? cat.label : ''} ${stars ? '· ' + stars : ''}</span>
        </div>
        ${hasChat
          ? `<span class="msg-newchat-badge-existing"><i class="fas fa-comment-dots"></i></span>`
          : `<button class="msg-newchat-badge-new msg-newchat-add-btn" onclick="event.stopPropagation();closeNewChatModal();openChatById(${b.id})" title="Iniciar chat"><i class="fas fa-plus"></i></button>`
        }
      </div>`;
  }).join('');
}

// ============================================================
//  RESPUESTAS INTELIGENTES DEL NEGOCIO
// ============================================================

function _pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Detecta el subtipo específico de un negocio basándose en sus tags y descripción.
 * Devuelve una clave como "panaderia", "sushi", "heladeria", etc.
 */
function _getBizSubtype(biz) {
  if (!biz) return 'general';
  const haystack = ((biz.tags || []).join(' ') + ' ' + (biz.description || '') + ' ' + (biz.name || '')).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');

  // Restaurantes - subtipos (orden importa: más específico primero)
  if (/panaderia|panadero/.test(haystack) || /pan fresco|pan artesanal|pan de/.test(haystack)) return 'panaderia';
  if (/baguette|croissant|hojaldre|bolleria/.test(haystack)) return 'panaderia';
  if (/heladeria|helado|sorbete|gelato/.test(haystack)) return 'heladeria';
  if (/sushi|ramen|japones|nikkei|sashimi|noodle|tonkotsu|miso/.test(haystack)) return 'sushi_ramen';
  if (/pizza|horno de lena|napolitano/.test(haystack)) return 'pizzeria';
  if (/hamburguesa|burger/.test(haystack)) return 'hamburgueseria';
  if (/mariscos|ceviche|corvina|camaron|langosta|tiradito/.test(haystack)) return 'mariscos';
  if (/tacos|burrito|mexicano|quesadilla|al pastor/.test(haystack)) return 'mexicano';
  if (/paste|torta|reposteria|cheesecake|macaron|bizcocho/.test(haystack)) return 'pasteleria';
  if (/asado|parrilla|bife|costilla|asador|steak/.test(haystack) && !/pizza/.test(haystack)) return 'parrilla';
  if (/vegano|vegetariano|plant-based|bowl veggie/.test(haystack)) return 'vegano';
  if (/tailandes|thai|pad thai|curry verde|tom yum/.test(haystack)) return 'tailandes';
  if (/crepe|wafle|pancake|brunch|huevo benedicto|mimosa/.test(haystack)) return 'brunch';
  if (/empanada/.test(haystack)) return 'empanadas';
  if (/smoothie|jugo natural|acai|superalimento/.test(haystack)) return 'jugos';
  if (/coffee|barista|espresso|cold brew|metodo alternativo|v60|aeropress|chemex/.test(haystack)) return 'cafeteria';
  if (/cafe literario|cafe boutique|cafe de origen/.test(haystack)) return 'cafeteria';
  if (/asiatico|wok|dim sum|pho|bao/.test(haystack)) return 'asiatico';
  if (/panameno|sancocho|patacon|tembleque|bienmesabe|crioll/.test(haystack)) return 'panameno';
  if (/dulceria|alfajor|cocada|polvoron/.test(haystack)) return 'dulceria';

  // Belleza - subtipos
  if (/manicure|pedicure|nail|unas/.test(haystack)) return 'nail';
  if (/masaje|spa|facial|aromaterapia|bienestar|relajante/.test(haystack)) return 'spa';
  if (/tatuaje|tattoo|piercing/.test(haystack)) return 'tattoo';
  if (/barberia|barber|fade|afeitado/.test(haystack)) return 'barberia';

  // Salud - subtipos
  if (/dental|odontolog|ortodoncia|blanqueamiento|implante/.test(haystack)) return 'dental';
  if (/gym|gimnasio|fitness|crossfit|spinning|zumba/.test(haystack)) return 'gym';
  if (/optica|lentes|gafas|vision/.test(haystack)) return 'optica';

  // Tecnología - subtipos
  if (/red|redes|camara de seguridad|cctv|servidor/.test(haystack)) return 'redes';

  // Transporte - subtipos
  if (/mecanica|taller|frenos|aceite|suspension|diagnostico/.test(haystack)) return 'mecanica';
  if (/ejecutivo|aeropuerto|premium|chofer/.test(haystack)) return 'transporte_ejecutivo';

  // Hogar - subtipos
  if (/libreria|libro|literatura|comic|lectura/.test(haystack)) return 'libreria';
  if (/ferreteria|herramienta|construccion|plomeria/.test(haystack)) return 'ferreteria';

  // Turismo - subtipos
  if (/fotografia|retrato|sesion|estudio foto/.test(haystack)) return 'fotografia';
  if (/tour|guia|excursion|canal|casco viejo/.test(haystack)) return 'tours';

  return 'general';
}

/**
 * Detecta la intención del usuario usando múltiples señales:
 * palabras clave, frases completas, contexto negativo ("no me quedó"),
 * verbos de acción ("cambiar", "devolver") y variantes coloquiales.
 */
function _detectIntent(t) {
  // t ya viene en minúsculas sin acentos normalizados
  const intents = [];

  // ── DEVOLUCIÓN / CAMBIO / NO QUEDÓ ──
  if (/(no me qued|no qued|no sirvi|no funcion|no jal|no encaj|no entr|cambiar|cambi|devolver|devolución|devolucion|reembolso|reembolsar|quiero cambiar|me la cambia|me lo cambia|talla mal|talla equivocad|quedó grande|quedó pequeño|quedo grande|quedo pequeño|no era lo que|vino mal|llegó mal|llegó roto|llegó dañado|llegó defectuoso|en mal estado|producto malo|no es lo que ped|no coincide|no es correcto|artículo incorrecto)/.test(t)) {
    intents.push('cambio_devolucion');
  }

  // ── QUEJA / PROBLEMA / MAL SERVICIO ──
  if (/(queja|reclamo|molest|inconveniente|pésimo|pesimo|mal servicio|mala atención|mala atencion|me trataron|irresponsable|tardaron mucho|nunca llegó|nunca llego|me estafaron|me robaron|me cobraron de más|cobro de mas|no cumplieron|incumplieron|fallaron|decepcionante|deplorable|negligencia|dañaron|rompieron|perdieron mi|extraviaron)/.test(t)) {
    intents.push('queja');
  }

  // ── PRODUCTO DAÑADO / DEFECTO ──
  if (/(dañad|roto|defecto|defectuos|no funciona|se dañó|se daño|se rompió|se rompio|no enciende|no prende|no carga|no corre|falla|fallo|error|no abre|no cierra|suena raro|hace ruido|se calienta demasiado|se sobre calienta|pantalla rota|pantalla rayada|pantalla quebrada)/.test(t)) {
    intents.push('producto_danado');
  }

  // ── PRECIO / COTIZACIÓN ──
  if (/(precio|costo|cuánto|cuanto|cuánto cuesta|cuanto cuesta|cuánto cobran|cuanto cobran|tarifa|valor|cuánto sale|cuanto sale|presupuesto|cotización|cotizacion|cotizar|cuánto me costaría|cuanto me costaria|qué precio|que precio|tienen precio|tienen tarifa|economico|barato|caro)/.test(t)) {
    intents.push('precio');
  }

  // ── HORARIO ──
  if (/(horario|qué hora|que hora|a qué hora|a que hora|cuándo abren|cuando abren|cuándo cierran|cuando cierran|están abiertos|estan abiertos|abren hoy|cierran hoy|hora de apertura|hora de cierre|cuándo atienden|cuando atienden|abierto ahora|hasta qué hora|hasta que hora|desde qué hora|desde que hora)/.test(t)) {
    intents.push('horario');
  }

  // ── DIRECCIÓN / UBICACIÓN ──
  if (/(dónde están|donde estan|dónde quedan|donde quedan|dirección|direccion|ubicación|ubicacion|cómo llego|como llego|cómo llegar|como llegar|están en|estan en|dónde se encuentran|donde se encuentran|local|sucursal|tienen tienda|tienen local|qué zona|que zona|en qué barrio|en que barrio|mapa|google maps)/.test(t)) {
    intents.push('ubicacion');
  }

  // ── CITA / RESERVA ──
  if (/(cita|reserva|reservar|agendar|agenda|turno|appointment|quiero una hora|pedir hora|disponibilidad|cupo|cuándo puedo ir|cuando puedo ir|puedo ir hoy|puedo ir mañana|puedo ir manana|me pueden atender|me pueden recibir|me dan un espacio)/.test(t)) {
    intents.push('cita');
  }

  // ── MENÚ / PRODUCTOS / QUÉ OFRECEN ──
  if (/(menú|menu|carta|qué platos|que platos|qué tienen|que tienen|qué ofrecen|que ofrecen|qué venden|que venden|qué servicios|que servicios|catálogo|catalogo|lista de precios|productos disponibles|tienen.*\?|venden.*\?|ofrecen.*\?)/.test(t)) {
    intents.push('menu_productos');
  }

  // ── DELIVERY / ENVÍO ──
  if (/(delivery|domicilio|envío|envio|mandan a|despachan|llevan a|traen a|a mi casa|a mi dirección|a mi direccion|entregan|hacen entregas|llega a|reparto|mensajería|mensajeria|shipping)/.test(t)) {
    intents.push('delivery');
  }

  // ── PAGO ──
  if (/(pago|pagar|cómo pago|como pago|métodos de pago|metodos de pago|efectivo|tarjeta|transferencia|yappy|nequi|sinpe|visa|mastercard|crédito|credito|débito|debito|depósito|deposito|digital|billetera|billetera digital|aceptan tarjeta|aceptan efectivo)/.test(t)) {
    intents.push('pago');
  }

  // ── DESCUENTO / PROMO ──
  if (/(descuento|promoción|promo|oferta|rebaja|especial|cupón|cupon|2x1|gratis|precio especial|precio de oferta|tienen algo barato|algo económico|algo economico|sale|hay algún descuento|hay algun descuento|están de oferta|estan de oferta)/.test(t)) {
    intents.push('descuento');
  }

  // ── TIEMPO / URGENCIA ──
  if (/(cuánto tarda|cuanto tarda|cuánto demora|cuanto demora|tiempo de espera|qué tan rápido|que tan rapido|urgente|para hoy|para ya|lo más pronto|lo mas pronto|inmediato|express|rápido|rapido|mismo día|mismo dia|en el día|en el dia|antes de las|para mañana|para manana)/.test(t)) {
    intents.push('tiempo');
  }

  // ── INFORMACIÓN CONTACTO ──
  if (/(teléfono|telefono|número|numero|whatsapp|llamar|llamada|contacto|correo|email|instagram|facebook|redes|página web|pagina web|página|pagina|web|redes sociales)/.test(t)) {
    intents.push('contacto');
  }

  // ── AGRADECIMIENTO ──
  if (/(gracias|thank|muchas gracias|muy amable|perfecto|excelente|genial|increíble|increible|muy bien|buenísimo|buenisimo|satisfecho|satisfecha|todo bien|quedé feliz|quede feliz|quedé contento|quede contento|estuvo bien|me gustó|me gusto|les quedo bien|les quedó bien)/.test(t)) {
    intents.push('gracias');
  }

  // ── SALUDO ──
  if (/(^hola|^buenas|^buenos|^hey|^hi |^buen dia|^buen día|saludos|^ola |buenas tardes|buenas noches|buenos dias|buenos días)/.test(t)) {
    intents.push('saludo');
  }

  // ── DISPONIBILIDAD / HAY STOCK ──
  if (/(disponible|disponibilidad|hay|tienen en stock|queda|quedan|en existencia|lo tienen|lo tienen disponible|está disponible|esta disponible|puedo conseguir|puedo comprar)/.test(t) && !intents.includes('menu_productos')) {
    intents.push('disponibilidad');
  }

  // ── CONFIRMACIONES / RESPUESTAS CORTAS ──
  if (/^(si|sí|no|ok|dale|listo|perfecto|claro|va|venga|bueno|está bien|esta bien|entendido|de acuerdo|acepto|confirmo|confirmado|correcto|exacto|así es|eso es)$/.test(t.trim())) {
    intents.push('confirmacion');
  }

  // ── PREFERENCIAS DE COMIDA / INGREDIENTES (para restaurantes) ──
  if (/(sin gluten|sin lactosa|sin azucar|sin carne|sin mariscos|sin nueces|vegetariano|vegano|celiaco|intolerante|alergico|alergia|pan|panes|carne|pollo|res|cerdo|mariscos|verduras|ensalada|picante|no picante|suave|sin sal|saludable|light|keto|paleo)/.test(t)) {
    if (!intents.includes('menu_productos') && !intents.includes('precio')) {
      intents.push('preferencia_comida');
    }
  }

  return intents;
}

function _getSmartReply(userText, cat, bizName, biz) {
  // Normalizar: minúsculas, quitar acentos para la detección
  const t = userText.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  const tOrig = userText.toLowerCase();

  const intents = [...new Set([..._detectIntent(t), ..._detectIntent(tOrig)])];

  const hours  = biz && biz.hours   ? biz.hours   : 'Lun–Sáb 8:00am – 6:00pm';
  const addr   = biz && biz.address ? biz.address : 'nuestra dirección en el perfil';
  const phone  = biz && biz.phone   ? biz.phone   : 'disponible en nuestro perfil';
  const ig     = biz && biz.instagram ? biz.instagram : '@' + bizName.toLowerCase().replace(/\s/g,'_');
  const sub    = _getBizSubtype(biz);

  // ── Prioridad: intenciones específicas primero ──

  if (intents.includes('cambio_devolucion')) return _pick([
    `¡Por supuesto! En ${bizName} aceptamos cambios 😊. ¿Tienes el comprobante de compra?`,
    `Claro, para el cambio necesitamos el artículo y el recibo. ¿Lo tienes a mano?`,
    `Sin problema. ¿Qué talla o modelo diferente necesitas? Lo gestionamos ya 🔄`,
    `Pasa por ${addr} con el artículo y el recibo. ¿Hay algo específico que prefieras?`,
    `¡Tranquilo/a! Lo resolvemos. ¿Fue un problema de talla, color o vino defectuoso?`,
    `Los cambios los procesamos en 24h. ¿Tienes el ticket de compra? 🧾`,
    `Sin costo adicional si es por defecto de fábrica. ¿Qué pasó exactamente? 🔄`,
    `¿Prefieres cambio por otro producto o reembolso? Ambas opciones disponibles 💳`,
  ]);

  if (intents.includes('producto_danado')) return _pick([
    `¡Lamentamos eso! 😟 Si vino defectuoso tiene garantía. ¿Qué falla exactamente?`,
    `Eso no debería pasar. Cubrimos productos defectuosos sin costo. ¿Cuándo lo compraste?`,
    `Entendemos. ¿El daño fue al recibirlo o después de usarlo? Eso nos ayuda con la garantía 🔧`,
    `Por favor tráenos el producto y lo revisamos o reemplazamos. ¿Cuándo puedes venir?`,
    `Toma foto del daño y compártela por aquí 📸. Así aceleramos el proceso.`,
    `¿Tienes el número de orden o factura? Lo revisamos ahora mismo 🧾`,
    `Garantía cubre defectos de fábrica hasta 6 meses. ¿En qué estado llegó? 🔍`,
    `Lo sentimos mucho. Tu satisfacción es lo más importante 🙏. ¿Lo resolvemos hoy?`,
  ]);

  if (intents.includes('queja')) return _pick([
    `Lamentamos mucho lo ocurrido 😔. ¿Nos cuentas en detalle qué pasó para resolverlo?`,
    `Gracias por decírnoslo, es la única forma de mejorar. ¿Cómo podemos compensarte?`,
    `Lo tomamos muy en serio 🙏. ¿Tienes fecha o número de pedido para revisarlo?`,
    `Disculpa el inconveniente. Vamos a revisar tu caso de inmediato. ¿Más detalles?`,
    `Tu opinión es muy importante para nosotros. ¿Qué podríamos hacer diferente? 💬`,
    `Pedimos disculpas sinceras. ¿Podemos llamarte para resolver esto personalmente? 📞`,
    `Queremos convertir esta experiencia negativa en positiva. ¿Nos das la oportunidad? 🌟`,
    `Escalamos tu caso de inmediato. ¿Cuál es el mejor horario para contactarte? ⏰`,
  ]);

  if (intents.includes('precio')) {
    const subP = {
      pasteleria:  [`Tortas personalizadas desde $35 🎂. Mini tortas $15. ¿Para cuántas personas?`, `Pasteles artesanales desde $25. ¿Es para alguna ocasión especial? 🎉`, `Cupcakes $2 c/u, tortas desde $35. ¿Qué decoración tienes en mente? 🍰`],
      panaderia:   [`Pan del día $1–$3, baguettes $2.50, postres $3–$8 🥐. ¿Qué buscas?`, `Desayunos completos desde $5. Croissants y bollería freshita cada mañana ☕`, `Pedidos especiales de pan artesanal disponibles. ¿Cuántas piezas necesitas? 🍞`],
      heladeria:   [`Bola sencilla $1.50, doble $2.50, copa especial $4 🍦. ¿Quieres conocer los sabores disponibles?`, `Paletas y helados desde $1.50. Combinaciones ilimitadas 🌈. ¿Cuál te llama la atención?`, `Todo entre $1.50 y $6. Sin colorantes artificiales 😋. ¿Qué sabor tropicaL prefieres?`],
      sushi_ramen: [`Rolls desde $8, combos desde $15 🍱. ¿Prefieres sushi, ramen o fusión?`, `Ramen desde $10, sushi sets desde $18 con 12 piezas 🍜. ¿Cuántas personas van a comer?`, `Menú ejecutivo de almuerzo $12 (roll + sopa + bebida) 🥢. ¿Es para hoy?`],
      pizzeria:    [`Pizzas personales $8, medianas $14, grandes $20 🍕. ¿Cuántas personas son?`, `Con horno de leña el sabor no tiene precio 🔥. Grandes $20 con ingredientes premium. ¿Cuál prefieres?`, `Promo: 2 pizzas grandes $35 esta semana 🎉. ¿Qué ingredientes te gustan?`],
      hamburgueseria:[`Hamburguesas desde $8 hasta $16 según el tamaño 🍔. ¿Prefieres clásica o gourmet?`, `Combo (burger+papas+bebida) $12. ¿Qué adicionamos? 😄`, `Burgers artesanales $10–$16 con pan casero. ¿Con queso extra o doble carne? 🧀`],
      mariscos:    [`Ceviche $10, corvina al ajillo $18, mixto de mariscos $22 🦐. ¿Para cuántos?`, `Platos fuertes de mariscos $15–$35. Frescos del Pacífico 🌊. ¿Qué prefieres?`, `Combo ceviche + corvina para 2 personas $30. ¿Lo apartamos? 🐟`],
      mexicano:    [`Tacos $2.50 c/u, burritos $7, quesadillas $8 🌮. ¿Cuántos quieres?`, `Combo 3 tacos + bebida $8.50. Rellenos a escoger 🔥. ¿Cuál prefieres?`, `Todo entre $2.50 y $12. Salsas caseras incluidas 🌶️. ¿Qué tan picante te gusta?`],
      parrilla:    [`Bife de chorizo $22, asado de tira $18, entraña $20 🥩. ¿Para cuántas personas?`, `Tabla parrillera para 2 personas $38. Para 4 personas $65. ¿Alguna celebración? 🍷`, `Cortes premium con 30 días de maduración. ¿Lo prefieres término medio o bien cocido? 🔥`],
      vegano:      [`Bowls desde $10, wraps $9, postres sin azúcar desde $4 🥗. ¿Tienes alguna alergia?`, `Menú completo (entrada+plato+bebida) $15 sin gluten ni lácteos 🌱. ¿Te interesa?`, `Hamburguesas de plantas $10. Sabor sin culpa 😄. ¿Primera vez aquí?`],
      brunch:      [`Pancakes $8, huevos benedictinos $10, waffles $9 🥞. ¿Con mimosa +$4?`, `Brunch completo $18 (entrada+plato+bebida). Solo sábados y domingos 🌅. ¿Ya tienes reserva?`, `Todo entre $8 y $18. El mejor brunch de la ciudad 🎉. ¿Para cuántas personas?`],
      empanadas:   [`Empanadas desde $1.50 c/u. Docena $15. Más de 20 rellenos 🫓. ¿Qué relleno prefieres?`, `Individuales $1.50, combo 6 unidades $8 con bebida 😋. ¿Para llevar o en el local?`, `Pedidos de eventos: docenas desde $14. ¿Para cuántas personas necesitas? 🎉`],
      jugos:       [`Jugos naturales $3, smoothies $5, acai bowl $8 🥤. ¿Qué necesitas hoy?`, `Shots de bienestar $2 c/u. Combos desde $6 🌿. ¿Buscas energía o desintoxicarte?`, `Todo fresco del día, sin azúcar añadida. Desde $3 😊. ¿Tienes alguna fruta favorita?`],
      cafeteria:   [`Espresso $1.50, americano $2, cappuccino $3, cold brew $4 ☕. ¿Cómo te gusta el café?`, `Desayuno completo $7 (café+croissant+jugo). ¿Lo probaste? 🥐`, `Granos de origen único, métodos alternativos. Desde $2.50. ¿Eres fan del V60? ☕`],
      tailandes:   [`Pad Thai $11, curry verde $13, tom yum $9 🍜. ¿Cuántas personas son?`, `Combo almuerzo $14 (plato+arroz+bebida). Solo mediodía 🌺. ¿Es para hoy?`, `Platos principales $10–$18. Auténtico estilo Chiang Mai 🇹🇭. ¿Con qué nivel de picante?`],
      asiatico:    [`Platos desde $9. Wok, dim sum y sopas asiáticas 🥢. ¿Qué cocina prefieres hoy?`, `Menú variado China, Japón, Vietnam. Desde $9 hasta $18 🌏. ¿Para cuántos?`, `Dim sum para 2 $15. Baos $3 c/u. Pho $10 🍲. ¿Qué te antoja?`],
      panameno:    [`Sancocho $8, arroz con pollo $9, ropa vieja $10 🇵🇦. ¿Cuántas personas son?`, `Menú del día $8 (sopa+plato+fresco). Sabor de casa 🏡. ¿Lo apartamos?`, `Comida criolla auténtica desde $7. Nada de congelados 😋. ¿Qué plato se te antoja?`],
      dulceria:    [`Dulces desde $0.50 c/u. Cajas regalo desde $15 🎁. ¿Para qué ocasión?`, `Alfajores $2, cocadas $1, polvorones $1.50. ¿Quieres una caja surtida? 🍬`, `Pedidos al por mayor con descuento. ¿Para evento o regalo? 🎊`],
      dental:      [`Limpieza $60, blanqueamiento $180, ortodoncia desde $800 🦷. ¿Tienes seguro médico?`, `Consulta de revisión $40. Presupuesto sin compromiso. ¿Cuándo quieres venir? 😁`, `Implantes desde $800 por pieza, con garantía de 5 años. ¿Tienes alguna consulta específica? 🩺`],
      spa:         [`Masaje relajante 60 min $55, 90 min $80 💆. ¿Alguna zona de tensión específica?`, `Facial completo $65. Paquete spa día completo $120 🌸. ¿Es para un regalo?`, `Primer masaje 15% OFF. Desde $55. ¿Lo agendamos para esta semana? ✨`],
      gym:         [`Mensualidad $35, trimestral $90, anual $300 💪. ¿Tienes experiencia en el gimnasio?`, `Plan estudiantil $25/mes. Incluye clases de spinning y yoga 🧘. ¿Eres estudiante?`, `Prueba gratis 3 días sin compromiso 🎉. ¿Cuándo puedes venir?`],
      mecanica:    [`Cambio de aceite $25, diagnóstico computarizado $15 🔧. ¿Qué tiene tu vehículo?`, `Frenos completos desde $80. Suspensión desde $60. ¿Cuál es el modelo del carro? 🚗`, `Diagnóstico gratuito esta semana. ¿Lo traes hoy o mañana? ⚙️`],
      transporte_ejecutivo:[`Aeropuerto desde $25, zonas urbanas desde $15 🚗. ¿Para cuándo y a dónde?`, `Tarifa fija al aeropuerto $30, sin sorpresas 🛫. ¿A qué hora es tu vuelo?`, `Servicio 24h. ¿Necesitas traslado o tour privado? Te cotizamos ya 📱`],
      tours:       [`City tour $35/persona, Canal de Panamá $45 🗺️. ¿Para cuántos van?`, `Tour Casco Viejo + Canal $55 con guía bilingüe ✈️. ¿Cuándo llegas a la ciudad?`, `Grupos de 5+ personas 15% OFF. ¿Cuántos van en total? 🌍`],
      fotografia:  [`Sesión de retratos $80/h, eventos $150/h 📸. ¿Qué tipo de sesión necesitas?`, `Paquete familiar $100 (1h + 20 fotos editadas). ¿Para cuándo? 📷`, `Edición profesional incluida en todos los paquetes. ¿Cuál es el evento? ✨`],
      redes:       [`Instalación de cámaras desde $120 por cámara 🔒. ¿Cuántas necesitas?`, `Redes empresariales desde $200 según el tamaño. ¿Es para casa u oficina? 🖥️`, `Diagnóstico de red gratis. Mantenimiento mensual $50. ¿Cuántos equipos tienes? 💻`],
    };
    const catP = {
      restaurantes: [`Platos desde $5 hasta $25 🍽️. ¿Quieres la carta completa?`, `Menú del día $8 (sopa + plato + bebida). ¿Algo en especial?`, `Opciones para todos los presupuestos. ¿Qué prefieres?`],
      belleza:      [`Corte $15 💇, tinte $45, manicure $12, pedicure $18. ¿Qué servicio?`, `¿Corte, color o tratamiento? Te doy el precio exacto 💅`, `Paquete básica dama $20 (corte+lavado). ¿Quieres más info?`],
      salud:        [`Consulta general $40, especialistas desde $60 🩺. ¿Tienes seguro médico?`, `Los exámenes de laboratorio arrancan desde $15. ¿Qué examen necesitas?`],
      tecnologia:   [`Diagnóstico gratis 🔧. Pantalla desde $35, batería $20. ¿Qué equipo tienes?`, `Reparaciones con garantía de 3 meses. ¿Cuál es el problema? 💻`],
      hogar:        [`Visita de diagnóstico sin costo 🏠. Trabajos desde $30. ¿Qué necesitas?`, `Presupuesto gratis y sin compromiso. ¿Cuál es el trabajo? 🔨`],
      turismo:      [`Tours desde $35/persona 🗺️. Grupos 5+ tienen 15% de descuento.`, `Paquetes desde $50 con transporte y guía. ¿Qué destino? ✈️`],
      transporte:   [`Aeropuerto desde $20, zonas urbanas desde $8 🚗. ¿A dónde vas?`],
      ropa:         [`Prendas desde $10 hasta $80 👗. ¿Qué tipo de prenda buscas?`, `Esta semana hasta 30% de descuento. ¿Quieres ver las ofertas? 🏷️`],
      deportes:     [`Equipos desde $15 ⚽. ¿Qué deporte practicas?`, `Zapatillas desde $35, ropa deportiva desde $15. ¿Tienes presupuesto? 💪`],
    };
    return _pick(subP[sub] || catP[cat] || [`Precios varían según el servicio 💰. ¿Qué necesitas exactamente?`, `Con gusto cotizamos. ¿Qué te interesa?`]);
  }

  if (intents.includes('horario')) return _pick([
    `Nuestro horario es ${hours} ⏰. ¿Algún día en especial que te convenga?`,
    `Atendemos ${hours}. Para citas puedes reservar con anticipación 📅`,
    `Disponibles ${hours}. ¿Necesitas agendar algo? 🗓️`,
    `Estamos abiertos ${hours}. ¿Tienes alguna duda sobre el día de hoy? 😊`,
    `Horario: ${hours}. Si vienes entre semana hay menos espera ⚡`,
    `Atendemos ${hours}. Los fines de semana te recomendamos reservar antes 📱`,
    `${hours} es nuestro horario. ¿Quieres que te avisemos si hay cambios? 🔔`,
    `¡Respondemos rápido en ese horario! ${hours} ⏰. ¿Para cuándo piensas venir?`,
  ]);

  if (intents.includes('ubicacion')) return _pick([
    `Estamos en ${addr} 📍. ¿Vienes en carro o transporte público?`,
    `Nos encuentras en ${addr}. Búscanos en Google Maps como "${bizName}" 🗺️`,
    `Dirección: ${addr}. ¿Necesitas que te expliquemos la ruta? 📌`,
    `Estamos ubicados en ${addr} 🏠. ¿Tienes referencia del sector?`,
    `${addr} es nuestra dirección. ¿Hay algún punto de referencia que te ayude a llegar? 🧭`,
    `Te esperamos en ${addr} 📍. Si llegas en Uber dales esa dirección exacta.`,
    `Puedes encontrarnos en ${addr}. En Google Maps busca "${bizName}" 🔍`,
    `Estamos en ${addr}. El estacionamiento más cercano está a media cuadra 🅿️`,
  ]);

  if (intents.includes('cita')) return _pick([
    `¡Agendamos! ¿Qué fecha y hora te viene bien? 📅`,
    `Con gusto. ¿Para cuántas personas y qué día prefieres? 🗓️`,
    `Tenemos disponibilidad esta semana. ¿Mañana o pasado? ⏰`,
    `¿Prefieres mañana, tarde o noche? Apartamos tu espacio ✅`,
    `Para la cita: ¿nombre y servicio que deseas? 😊`,
    `¡Claro! ¿Cuál es tu nombre y para qué día lo necesitas? 📋`,
    `Agenda confirmada en menos de 5 min. ¿Qué día y hora prefieres? ⚡`,
    `Tenemos turnos disponibles. ¿Prefieres que te confirmemos por aquí o por llamada? 📱`,
    `¿Para ti solo o vas acompañado? Así coordinamos mejor el espacio 😊`,
    `Perfecto. ¿Tienes preferencia de horario, mañana o tarde? 🗓️`,
  ]);

  if (intents.includes('delivery')) return _pick([
    `¡Sí hacemos entregas! 🛵 30–45 min aprox. ¿Cuál es tu dirección?`,
    `Delivery dentro de la ciudad 📦. ¿Dónde estás?`,
    `Envío gratis en compras mayores a $20 🎉. ¿Tu ubicación?`,
    `¡Claro que sí! ¿A qué barrio o zona enviamos? 🗺️`,
    `Hacemos delivery todos los días. ¿A qué hora lo necesitas? ⏰`,
    `Tenemos servicio a domicilio 🛵. ¿La dirección exacta para calcular el tiempo?`,
    `Delivery disponible. ¿Pagas efectivo o digital al recibir? 💳`,
    `Repartidores propios para llegar en tiempo y forma 🚴. ¿Tu dirección?`,
    `¡Llevamos hasta tu puerta! ¿A qué hora estarás en casa? 🏠`,
  ]);

  if (intents.includes('pago')) return _pick([
    `Efectivo, tarjeta débito/crédito y transferencias 💳. ¿Cuál prefieres?`,
    `Visa, Mastercard, efectivo y Yappy 📱. ¡El método que quieras!`,
    `Todos los métodos: efectivo, tarjeta y digital ✅. ¿Necesitas factura?`,
    `Aceptamos efectivo, tarjeta y transferencia bancaria 🏦. ¿Cuál te queda mejor?`,
    `Pago digital con Yappy, Nequi o transferencia. ¿Cuál usas? 📲`,
    `¡Sin problema de pago! Efectivo o tarjeta, lo que prefieras 😊`,
    `Todas las tarjetas aceptadas. ¿Necesitas recibo o factura? 🧾`,
    `Pagos seguros en todos los métodos. ¿Tienes alguna preferencia? 🔒`,
    `También aceptamos QR y pago móvil. Muy cómodo y rápido ⚡`,
  ]);

  if (intents.includes('descuento')) return _pick([
    `¡Sí tenemos promos! 🎉 Esta semana 20% de descuento. ¿Te interesa?`,
    `Clientes nuevos: 15% off en su primera compra 🌟. ¿Es tu primera vez?`,
    `2 servicios por el precio de 1 los martes 🔥. ¿Te apuntas?`,
    `Tenemos programa de lealtad: acumula puntos y canjea descuentos 🎁`,
    `Síguenos en Instagram ${ig} para ver las promos exclusivas 📸`,
    `Descuento del 10% si traes un amigo nuevo. ¡Recomiéndanos! 👥`,
    `Oferta de temporada activa. ¿Quieres que te cuente los detalles? 🏷️`,
    `Promociones los miércoles y viernes. ¿Cuál es mejor para ti? 📅`,
    `Primera visita con 15% off. ¿Ya viniste antes? 😊`,
    `Combo especial del mes disponible. ¿Te lo cuento? 🌟`,
  ]);

  if (intents.includes('tiempo')) {
    const subT = {
      pasteleria:   [`Tortas personalizadas necesitan 48–72h de anticipación 🎂. ¿Para cuándo la necesitas?`, `Pedidos con menos de 48h dependen de disponibilidad. ¿Cuándo es la fecha? 📅`],
      panaderia:    [`El pan está listo cada mañana desde las 7am 🥐. ¿Necesitas algo para hoy?`, `Pedidos especiales con 24h de anticipación. ¿Para cuándo? 🍞`],
      heladeria:    [`Estamos listos apenas abres la puerta 🍦. Sin espera. ¿Vienes hoy?`, `Los pedidos para eventos los preparamos en 24h. ¿Es para una fiesta? 🎉`],
      sushi_ramen:  [`Ramen 10–15 min, sushi rolls 15–20 min 🍜. ¿Estás en el local o pides delivery?`, `Delivery 35–50 min según zona. ¿Cuál es tu dirección? 🛵`],
      pizzeria:     [`Pizza al horno de leña: 20–25 min 🍕. Vale la espera. ¿La pides aquí o delivery?`, `Delivery 40–50 min, en el local 20–25 min. ¿Cómo prefieres? 🚴`],
      hamburgueseria:[`Burger lista en 12–15 min ⏱️. Sin prisa, con calidad. ¿Para comer aquí o llevas?`, `Para pedidos grandes (+5 burgers) avisa con 20 min. ¿Cuántas necesitas? 🍔`],
      mariscos:     [`Ceviche: inmediato, cocinados 20–30 min 🐟. ¿Qué pediste?`, `Delivery de mariscos 40–50 min para que llegue fresco. ¿Tu dirección? 🛵`],
      vegano:       [`Bowls listos en 10–15 min 🥗. Todo fresco. ¿Estás en el local?`, `Delivery 30–40 min. Todo preparado al momento, sin precocidos 🌱`],
      cafeteria:    [`Espresso en 2 min, cold brew listo en barra ☕. ¿Vienes a quedarte o para llevar?`, `Desayunos en 5–8 min. ¿A qué hora llegas? ⏰`],
      dental:       [`Consulta regular: puntual con cita. Sin cita según disponibilidad 🦷. ¿Agendamos?`, `Emergencias dentales atendemos el mismo día 🚨. ¿Es urgente?`],
      spa:          [`Masaje: 60 o 90 min. Facial: 60–75 min 💆. ¿Cuánto tiempo tienes?`, `Agenda con 24h de anticipación para garantizarte el horario 🌸. ¿Qué día prefieres?`],
      gym:          [`Puedes venir cualquier día en horario ${hours} 💪. ¿Cuándo quieres empezar?`, `Clases de spinning 45 min, yoga 60 min, zumba 50 min 🧘. ¿Cuál te interesa?`],
      mecanica:     [`Cambio de aceite: 30 min ⚡. Frenos: 2–3h. Diagnóstico: 30–45 min. ¿Qué tiene tu carro?`, `Si es urgente puede venir sin cita y atendemos por orden de llegada 🔧. ¿Lo traes hoy?`],
    };
    const catT = {
      tecnologia:   [`Reparaciones básicas en el día ⚡, complejas 24–48h. ¿Qué tiene tu equipo?`, `Pantalla: 2h. Batería: 1h. Software: mismo día 🔧. ¿Cuál es tu caso?`],
      restaurantes: [`En mesa: 15–20 min ⏱️. Delivery: 30–45 min. ¿Para cuándo lo necesitas?`, `Si reservas garantizamos tu mesa al llegar 🍽️`],
      belleza:      [`Corte 30 min, tinte 2h, manicure 1h 💅. ¿Qué servicio te interesa?`, `¿Agendamos cita para garantizarte la hora? 📅`],
      hogar:        [`Trabajos pequeños: mismo día ⚡. Remodelaciones: 2–7 días. ¿Qué necesitas?`, `Técnicos disponibles hoy si es urgente 🔨. ¿Cuál es el trabajo?`],
      transporte:   [`Confirmamos el vehículo en 15 min 🚗. Llegamos en 20–30 min. ¿Para cuándo?`, `Traslado al aeropuerto: te recogemos con 30 min de anticipación 🛫`],
      turismo:      [`Tours de medio día: 4–5h. Día completo: 8–10h 🗺️. ¿Cuánto tiempo tienes?`, `Los tours salen por la mañana. ¿Cuántos días estarás? ✈️`],
      salud:        [`Consultas con cita: espera máx 15 min 🩺. Sin cita según disponibilidad.`, `Exámenes de laboratorio listos en 24–48h. Urgentes en el día 🏥`],
    };
    return _pick(subT[sub] || catT[cat] || [`Depende del servicio. ¿Nos das más detalles? ⏱️`, `Trabajamos rápido. ¿Qué tan urgente es? ⚡`]);
  }

  if (intents.includes('contacto')) return _pick([
    `Llámanos al ${phone} 📞. También atendemos aquí en Fynder.`,
    `Número: ${phone}. ¿Prefieres que te contactemos? 📲`,
    `¡Escríbenos aquí! O si prefieres llamar: ${phone} ☎️`,
    `Instagram: ${ig} 📸. Teléfono: ${phone}.`,
    `Puedes contactarnos al ${phone} o por aquí mismo 💬. ¿Qué prefieres?`,
    `Estamos disponibles al ${phone} y por Fynder Chat 🤝`,
    `Tel: ${phone}. WhatsApp también disponible 📱. ¿Cómo te queda mejor?`,
    `Síguenos en ${ig} para novedades 📸. Para urgencias: ${phone}`,
    `Respondemos este chat en menos de 5 minutos ⚡. ¿O prefieres que te llamemos?`,
  ]);

  if (intents.includes('gracias')) return _pick([
    `¡A ti por preferirnos! 🙏 ¡Hasta pronto!`,
    `¡Gracias a ti! 😊 Que tengas un excelente día.`,
    `¡De nada! Tu satisfacción es nuestra prioridad ⭐`,
    `Es un honor servirte. ¡Siempre estamos aquí! 💚`,
    `¡Fue un placer atenderte! Vuelve pronto 🌟`,
    `¡Gracias por confiar en ${bizName}! 🙌 ¡Hasta la próxima!`,
    `¡Con mucho gusto! Si necesitas algo más, aquí estaremos 😊`,
    `¡Feliz de haberte ayudado! ¿Hay algo más antes de irte? 💬`,
    `Nos alegra que todo haya quedado claro. ¡Buen día! ☀️`,
    `¡Igualmente! Tu visita nos alegra 😄 ¿Nos dejas una reseña? ⭐`,
  ]);

  if (intents.includes('disponibilidad')) return _pick([
    `¡Sí tenemos disponibilidad! ✅ ¿Para qué fecha?`,
    `Déjame verificar. ¿Qué es lo que buscas exactamente? 🔍`,
    `Sí contamos con eso. ¿Lo apartamos ahora? 📦`,
    `¡Disponible! ¿Lo reservo a tu nombre? 📋`,
    `Tenemos stock/disponibilidad para esta semana. ¿Cuándo lo necesitas? 📅`,
    `¡Sí hay! ¿Cuántas unidades o para cuántas personas? 😊`,
    `Disponibilidad confirmada ✅. ¿Quieres que lo separemos?`,
    `¡Perfecto momento para pedirlo! Aún tenemos. ¿Continúo con la reserva? 🎉`,
  ]);

  if (intents.includes('menu_productos')) {
    const subM = {
      pasteleria:   [`Tortas personalizadas, cupcakes, pasteles de temporada y postres de autor 🎂. ¿Para qué ocasión?`, `Especialidades: tortas de boda, cumpleaños, bautizos y eventos corporativos. ¿Tienes algún diseño en mente? 🎨`, `También hacemos mesas de dulces y postres para eventos. ¿Cuándo es la celebración? 🎉`],
      panaderia:    [`Pan artesanal, baguettes, croissants, galletas, brownies y postres caseros 🍞. ¿Qué te apetece?`, `Pan fresco cada mañana desde las 7am. También pedidos especiales. ¿Qué necesitas? 🥐`, `Recetas tradicionales de abuela: pan de yema, rosquillas, almojábanas 😋. ¿Tienes algún favorito?`],
      heladeria:    [`Más de 30 sabores de frutas tropicales: maracuyá, guanábana, tamarindo, carambola 🍦. ¿Cuál quieres probar?`, `Helados artesanales, paletas, sorbetes y helados de crema 🌈. ¿Prefieres frutal o cremoso?`, `Sin colorantes artificiales 🌿. Sabores de temporada también. ¿Cuál es tu fruta favorita?`],
      sushi_ramen:  [`Rolls creativos, sashimi premium, ramen tonkotsu/shoyu/miso y platos de fusión nikkei 🍱. ¿Qué prefieres?`, `Combinados de sushi desde 12 piezas, ramen con noodles frescos y chashu de cerdo 🍜. ¿Para cuántos son?`, `También tenemos tapas japonesas, gyozas y edamame de entrada 🥢. ¿Es tu primera vez?`],
      pizzeria:     [`Pizzas al horno de leña: margherita, pepperoni, cuatro quesos, hawaiana y especiales del día 🍕. ¿Cuál te gusta?`, `Masa madre fermentada 48h con tomates San Marzano importados. ¿La prefieres clásica o con ingredientes premium? 🇮🇹`, `También tenemos antipastos, ensaladas y postres italianos. ¿Con qué empezamos? 🫒`],
      hamburgueseria:[`Burgers clásica, con queso, doble carne, bacon, BBQ y opciones del chef 🍔. ¿Cuál te llama la atención?`, `Carne 100% nacional, panes artesanales, quesos importados. También papas fritas y batidos 🥤. ¿Qué combinas?`, `Menú completo con salsas secretas de la casa 😍. ¿Tienes alguna restricción alimentaria?`],
      mariscos:     [`Ceviche clásico y mixto, corvina al ajillo, camarones en salsa, langosta y pescados a la parrilla 🦐. ¿Qué prefieres?`, `Frescos del Pacífico cada día. También tiraditos y leche de tigre. ¿Quieres algo del mar? 🌊`, `Platos fuertes y entradas de mariscos. Vista al mar incluida 🐟. ¿Para cuántos son?`],
      mexicano:     [`Tacos de carne asada, al pastor, pollo y veggie. Burritos, quesadillas y nachos 🌮. ¿Qué prefieres?`, `Salsas caseras: verde, roja, habanero (niveles de picante 1 al 5) 🌶️. ¿Con qué lo acompañamos?`, `También tenemos guacamole fresco, elotes y aguas frescas de Jamaica y tamarindo 🫙. ¿Primera visita?`],
      parrilla:     [`Asado de tira, bife de chorizo, entraña, costillas y mollejas al carbón 🥩. ¿Qué corte prefieres?`, `Empanadas de entrada, ensaladas y vinos argentinos seleccionados. ¿Lo piensas para hoy? 🍷`, `También tenemos opciones para niños y vegetarianos. ¿Alguna restricción en el grupo? 🌿`],
      vegano:       [`Bowls, wraps, hamburguesas de plantas, smoothies y postres sin azúcar refinada 🥗. ¿Qué buscas?`, `Menú 100% vegano y vegetariano, sin gluten en varias opciones 🌱. ¿Tienes alguna alergia?`, `También tenemos opciones raw y sin soya. ¿Es tu primera vez comiendo vegano? 😊`],
      tailandes:    [`Pad Thai, curry verde/rojo, tom yum, mango sticky rice y satay 🍜. ¿Has probado comida tailandesa antes?`, `Recetas auténticas de Chiang Mai. Ingredientes importados directamente 🇹🇭. ¿Con qué nivel de picante?`, `También tenemos dim sum thai, sopas y postres tropicales 🥥. ¿Cuántos son en la mesa?`],
      brunch:       [`Pancakes, waffles, huevos benedictinos, avocado toast, smoothie bowls y mimosas 🥞. ¿Qué antoja?`, `Menú de brunch solo sábados y domingos 🌅. ¿Ya tienes reserva para este fin de semana?`, `Opciones dulces y saladas, con y sin gluten 😊. ¿Prefieres algo ligero o abundante?`],
      empanadas:    [`Más de 20 rellenos: pollo, res, champiñones, queso, camarones, jalapeño y dulces 🫓. ¿Cuál prefieres?`, `Colombianas y panameñas, fritas y al horno. También salsas caseras 😋. ¿Llevas o comes aquí?`, `Para eventos hacemos pedidos de docenas personalizados. ¿Tienes alguna celebración? 🎉`],
      jugos:        [`Jugos naturales, smoothies tropicales, acai bowls, shots de jengibre y cúrcuma 🥤. ¿Qué necesita tu cuerpo hoy?`, `Todo sin azúcar añadida, con frutas frescas y superalimentos 🌿. ¿Buscas energía o detox?`, `También tenemos leches vegetales y bases de smoothie. ¿Tienes alguna intolerancia? 😊`],
      cafeteria:    [`V60, aeropress, chemex, cold brew y espresso de origen único ☕. ¿Cómo prefieres tu café?`, `Granos de origen sostenible, tés artesanales y repostería fina 🥐. ¿Con algo de comer?`, `Baristas certificados. Cada taza es especial. ¿Ya conoces el cold brew? ❄️`],
      asiatico:     [`China (dim sum, chow mein), Japón (sushi, ramen), Tailandia (curry), Vietnam (pho) 🥢. ¿Qué cocina hoy?`, `Wok al fuego vivo, baos rellenos, dumplings y sopas asiáticas 🌏. ¿Tienes favorito?`, `Menú fusión que cambia según la temporada. ¿Tienes alergias a mariscos o soya? 🍜`],
      panameno:     [`Sancocho de gallina, arroz con pollo, ropa vieja, patacones y tembleque 🇵🇦. ¿Qué plato te lleva a casa?`, `Comida criolla auténtica, recetas de generación en generación 🏡. ¿Cuándo fue la última vez que comiste bienmesabe?`, `También almuerzo ejecutivo y para llevar. ¿Para cuántos es? 🍽️`],
      dulceria:     [`Alfajores, cocadas, polvorones, dulce de leche, tamales dulces y conservas 🍬. ¿Para regalo o personal?`, `Cajas surtidas para eventos y celebraciones. Empaque artesanal incluido 🎁. ¿Qué ocasión?`, `Sabores tradicionales panameños y latinoamericanos. ¿Tienes algún favorito de la infancia? 😄`],
      dental:       [`Ortodoncia, blanqueamiento, implantes, limpiezas, resinas y odontología estética 🦷. ¿Qué necesitas?`, `También extracciones, endodoncias y prótesis dentales. ¿Es urgente o programado? 🩺`, `Tecnología digital para diagnósticos precisos. ¿Cuándo fue tu última visita al dentista? 😁`],
      spa:          [`Masajes relajantes, descontracturantes, de piedras calientes, faciales, tratamientos corporales y aromaterapia 💆. ¿Qué buscas?`, `Paquetes individuales, de pareja y grupos. ¿Es para regalo o para ti? 🌸`, `También hacemos exfoliaciones, envolturas y tratamientos anti-estrés 🕯️. ¿Cuánto tiempo tienes?`],
      gym:          [`Pesas, cardio, spinning, yoga, zumba, crossfit y planes nutricionales 💪. ¿Qué objetivo tienes?`, `Entrenadores certificados para rutinas personalizadas. ¿Quieres bajar de peso, ganar músculo o mejorar tu condición? 🏋️`, `Área de funcional, clases grupales y sesiones individuales 🧘. ¿Ya tienes experiencia?`],
      mecanica:     [`Diagnóstico computarizado, frenos, suspensión, cambio de aceite, alineación y mantenimiento general 🔧. ¿Qué tiene tu vehículo?`, `Servicio para todos los modelos y marcas. ¿Es gasolina o diesel? 🚗`, `También hacemos revisión previa a viajes largos. ¿Cuándo saldrás? ✅`],
    };
    const catM = {
      restaurantes: [`Entradas, sopas, platos fuertes, postres y bebidas 🍽️. ¿Quieres las especialidades del día?`, `Menú del día $10 (sopa+plato+bebida) 🥗. ¿Qué prefieres?`],
      belleza:      [`Cortes, tintes, manicure, pedicure, maquillaje y tratamientos capilares 💅. ¿Qué te interesa?`],
      tecnologia:   [`Reparamos pantallas, baterías, cámaras, puertos y software 🔧. ¿Qué equipo?`],
      salud:        [`Medicina general, pediatría, nutrición, fisioterapia y más 🏥. ¿Qué especialidad?`],
      hogar:        [`Plomería, electricidad, pintura, carpintería y remodelaciones 🏠. ¿Qué necesitas?`],
      turismo:      [`City tours, aventura, ecoturismo y paquetes de varios días 🗺️. ¿Qué experiencia buscas?`],
      transporte:   [`Aeropuerto, city tour, ejecutivo y traslados especiales 🚗. ¿Qué necesitas?`],
      ropa:         [`Casual, formal, sport y ocasiones especiales 👗. ¿Qué estilo buscas?`],
      deportes:     [`Ropa, calzado y equipamiento para todo deporte ⚽. ¿Qué deporte practicas?`],
    };
    return _pick(subM[sub] || catM[cat] || [`En ${bizName} tenemos amplia variedad. ¿Qué buscas? 😊`, `¡Cuéntanos qué necesitas y te orientamos! 🌟`]);
  }

  if (intents.includes('confirmacion')) {
    const subConf = {
      pasteleria:   [`¡Perfecto! 🎂 ¿Confirmas la fecha y el diseño? Te envío el presupuesto.`, `¡Genial! ¿Me dices para cuántas personas y el sabor que prefieres? 🍰`],
      panaderia:    [`¡Listo! 🥐 ¿Para qué hora pasas a recogerlo?`, `¡Entendido! Déjame anotar el pedido. ¿Cuántas unidades? 🍞`],
      heladeria:    [`¡Dale! 🍦 ¿Cuántas bolas y de qué sabores?`, `¡Perfecto! ¿Lo comes aquí o lo llevas? 🌈`],
      sushi_ramen:  [`¡Listo! 🍱 ¿Quieres la mesa ahora o hacemos el pedido para delivery?`, `¡Genial! ¿Cuántas personas son? Te organizo el combo ideal 🥢`],
      pizzeria:     [`¡Va! 🍕 ¿Para comer aquí o llevás? Y el tamaño, ¿grande o mediana?`, `¡Perfecto! ¿Qué ingredientes le ponemos? 🧀`],
      hamburgueseria:[`¡Dale! 🍔 ¿Cuántas burgers son y con qué salsa?`, `¡Claro! ¿Papas fritas incluidas o algo diferente de acompañante? 🥤`],
      mariscos:     [`¡Perfecto! 🐟 ¿Lo comes aquí o lo llevamos a domicilio?`, `¡Genial! ¿Quieres que te prepare la mesa con vista al mar? 🌊`],
      dental:       [`¡Listo! 🦷 ¿Confirmas el día y la hora? ¿Es consulta inicial o tienes tratamiento en curso?`, `¡Perfecto! ¿Tienes alguna alergia a medicamentos que debamos saber? 🩺`],
      spa:          [`¡Agendado! 💆 ¿Confirmas el día y a qué nombre quedo la cita?`, `¡Genial! ¿Tienes alguna zona de tensión específica que debamos trabajar? 🌸`],
      gym:          [`¡Excelente! 💪 ¿Cuándo quieres empezar? Te asignamos un entrenador.`, `¡Perfecto! ¿Tienes alguna condición física que debamos considerar? 🏋️`],
    };
    return _pick(subConf[sub] || [
      `¡Perfecto! 😊 ¿Con qué continuamos?`,
      `¡Genial! ¿Necesitas algo más?`,
      `¡Entendido! ¿Algo más en lo que podamos ayudarte? ✅`,
      `¡De acuerdo! ¿Confirmamos los detalles? 🙏`,
    ]);
  }

  if (intents.includes('preferencia_comida')) {
    const subPref = {
      pasteleria:   [`¡Sin problema! Trabajamos con opciones sin gluten y sin lactosa. ¿Para cuántas personas es? 🎂`, `Usamos ingredientes naturales y podemos adaptar la receta a tus necesidades 🌿. ¿Qué necesitas evitar?`],
      panaderia:    [`Tenemos pan artesanal sin gluten y opciones integrales 🍞. ¿Qué buscas exactamente?`, `Pan sin gluten disponible con pedido previo de 24h. ¿Lo necesitas para cuándo? 😊`],
      sushi_ramen:  [`¡Sin gluten en la mayoría de rolls! Indicamos cuáles llevan soya. ¿Tienes celiaquía? 🥢`, `Opciones sin mariscos disponibles. Ramen de pollo es perfecto para eso 🍜. ¿Lo vemos?`],
      vegano:       [`¡Aquí todo es tuyo! 🌱 Vegano, sin gluten, sin soya a petición. ¿Qué prefieres?`, `Menú 100% plant-based. ¿Tienes alguna alergia específica además? 😊`],
      mexicano:     [`¡Sin picante sin problema! Salsas aparte siempre 🌮. ¿Qué relleno prefieres?`, `Opción vegetariana: tacos de frijoles, champiñones o nopales 🥑. ¿Te interesa?`],
      mariscos:     [`Si tienes alergia a mariscos podemos preparar platos solo de pescado 🐟. ¿Cuál prefieres?`, `El ceviche de corvina es perfecto si quieres evitar mariscos 🌊. ¿Lo pedimos?`],
    };
    return _pick(subPref[sub] || [
      `¡Sin problema! Nos adaptamos a tus preferencias 😊. ¿Qué necesitas evitar?`,
      `Tenemos opciones para diferentes necesidades alimentarias 🌿. ¿Cuéntanos más?`,
      `Siempre buscamos que disfrutes sin preocupaciones 🙏. ¿Qué restricción tienes?`,
    ]);
  }

  if (intents.includes('saludo')) return _pick([
    `¡Hola! 👋 Bienvenido a ${bizName}. ¿En qué podemos ayudarte?`,
    `¡Buenas! 😊 Gracias por contactar a ${bizName}. ¿Cómo servirte?`,
    `¡Hola! Un gusto. Estamos para atenderte. ¿Qué necesitas?`,
    `¡Bienvenido! 🌟 En ${bizName} estamos para lo que necesites.`,
    `¡Hey! 👋 Me alegra que nos escribas. ¿En qué te ayudamos hoy?`,
    `¡Hola! 😄 ¿Es tu primera vez con nosotros o ya nos conoces?`,
    `¡Buenas! Qué gusto tenerte aquí. ¿Cómo podemos ayudarte? 🙌`,
    `¡Hola hola! 👋 En ${bizName} estamos listos para atenderte.`,
    `¡Bienvenido/a! 🎉 ¿Qué te trae por aquí hoy?`,
    `¡Hola! Escríbenos lo que necesitas y te respondemos de inmediato 💬`,
  ]);

  // ── Fallback por subtipo específico (cuando no se detectó intención) ──
  const subFb = {
    pasteleria:   [
      `¿Es para una ocasión especial? 🎂 Personalizamos cada torta al detalle.`,
      `Pasteles artesanales con ingredientes frescos. ¿Qué sabor te gusta más? 🍰`,
      `También hacemos delivery de pasteles. ¿Para cuándo lo necesitas? 🎁`,
      `¿Tienes algún diseño en mente? Tráenos la foto y lo recreamos 🎨`,
      `Nuestro croissant de mantequilla es el favorito del barrio ☕. ¿Lo has probado?`,
    ],
    panaderia:    [
      `Pan artesanal fresco cada mañana 🥖. ¿Cuándo puedes pasar?`,
      `Las galletas de avena de hoy salieron perfectas 😋. ¿Quieres una caja?`,
      `Panadería con recetas de abuela. ¿Hay algún pan que recuerdes de tu infancia? 🍞`,
      `También hacemos pedidos para eventos. ¿Necesitas algo especial? 🎉`,
      `¿Desayuno o merienda? Tenemos algo para cada momento del día ☕`,
    ],
    heladeria:    [
      `El helado de maracuyá de hoy está para chuparte los dedos 🍦. ¿Lo pruebas?`,
      `Más de 30 sabores tropicales sin colorantes. ¿Cuál es tu fruta favorita? 🌈`,
      `¿Vienes tú solo o traes a alguien? Tenemos opciones para todos 😊`,
      `Hoy el sabor especial del día es guanábana con coco 🌴. ¿Te interesa?`,
      `El calor pide helado 🌞. ¿Cuándo pasas por acá?`,
    ],
    sushi_ramen:  [
      `¿Sushi o ramen hoy? 🍜 Ambos están fresquísimos.`,
      `El tonkotsu está hirviendo desde las 6am 🍲. ¿Para cuándo reservamos?`,
      `Rolls especiales de hoy: tempura de langostino y aguacate 🥢. ¿Te animas?`,
      `¿Eres fan del ramen? El caldo lo preparamos 18 horas. Nada de sobres 😄`,
      `Fusión nikkei: lo mejor de Japón y Perú en un mismo plato 🌏. ¿Lo probaste?`,
    ],
    pizzeria:     [
      `La pizza al horno de leña huele diferente 🔥. ¿Cuándo nos visitas?`,
      `Masa madre de 48h fermentadas. ¿Prefieres finita o gruesa? 🍕`,
      `¿Para llevar, comer aquí o delivery? Dinos y la preparamos 🛵`,
      `Esta semana tenemos pizza especial de trufa y funghi. ¿Te interesa? 🍄`,
      `Ingredientes importados de Italia. El sabor auténtico que no encuentras en otro lado 🇮🇹`,
    ],
    hamburgueseria:[
      `Las burgers de hoy están jugosas 🍔. ¿Cuántas personas son?`,
      `¿Clásica o te animas con la del chef de la semana? Tiene doble carne y bacon crujiente 🥓`,
      `Papas fritas con nuestro sazón secreto. ¿Las pides con salsa de la casa? 😋`,
      `Para llevar o para comer aquí. Ambas opciones disponibles 🛵`,
      `Batidos artesanales que complementan perfecto la burger 🥤. ¿De qué sabor?`,
    ],
    mariscos:     [
      `Los mariscos llegaron frescos del Pacífico esta mañana 🌊. ¿Qué prefieres?`,
      `Ceviche clásico o mixto, ¿cuál te gusta más? 🐟`,
      `La corvina al ajillo es el plato estrella. ¿La has probado? 🍋`,
      `Vista al mar y mariscos frescos. Difícil combinación de superar 🌅`,
      `¿Vienes a comer o pides delivery? Ambas opciones disponibles 🛵`,
    ],
    mexicano:     [
      `¿Cuántos tacos te preparamos hoy? 🌮 Al pastor son los favoritos.`,
      `Las salsas caseras van del nivel 1 (suave) al 5 (fuego). ¿Cuánto aguantas? 🌶️`,
      `Burritos cargados o quesadillas crocantes. ¿Qué se te antoja? 😋`,
      `Todo preparado con ingredientes frescos y auténticos. ¿Primera vez aquí?`,
      `También tenemos opción vegetariana con frijoles negros y aguacate 🥑`,
    ],
    parrilla:     [
      `La parrilla está encendida 🔥. ¿Qué corte prefieres hoy?`,
      `Bife de chorizo término medio o bien cocido. ¿Cómo lo quieres? 🥩`,
      `Vinos argentinos seleccionados para acompañar. ¿Celebramos algo? 🍷`,
      `Tabla parrillera para compartir. ¿Para cuántas personas son? 🍽️`,
      `Las empanadas de entrada son caseras y recién salidas del horno 😋`,
    ],
    vegano:       [
      `¿Qué busca tu cuerpo hoy? 🌱 Tenemos opciones energéticas y desintoxicantes.`,
      `Todo sin carne, sin lácteos, sin culpa 😄. ¿Tienes alguna alergia?`,
      `El bowl de quinoa con aguacate de hoy está increíble 🥗. ¿Lo pruebas?`,
      `¿Primera vez comiendo vegano? Te ayudamos a elegir 🙏`,
      `Postres sin azúcar refinada que saben a nube ☁️. ¿Tienes hueco para el postre?`,
    ],
    cafeteria:    [
      `El V60 de hoy viene de granos etíopes. Frutal y aromático ☕. ¿Lo probamos?`,
      `¿Espresso, filtrado o cold brew? Cada uno cuenta su historia 🫗`,
      `Baristas certificados, granos de origen. No es solo un café, es una experiencia ✨`,
      `¿Lo acompañamos con algo de repostería? El croissant de mantequilla está perfecto 🥐`,
      `¿Te quedas un rato? Tenemos eventos culturales semanales en el café 📚`,
    ],
    tailandes:    [
      `El Pad Thai hoy viene con langostinos frescos 🍜. ¿Lo pruebas?`,
      `¿Curry verde o rojo? Ambos están recién preparados con pasta casera 🌿`,
      `El tom yum es perfecto para el clima de hoy 🍲. ¿Qué tan picante te gusta?`,
      `Recetas auténticas de Chiang Mai. Nada de imitaciones 🇹🇭`,
      `¿Primera vez comiendo tailandés? Te explicamos el menú con gusto 😊`,
    ],
    brunch:       [
      `Solo sábados y domingos 🌅. ¿Ya tienes tu reserva para este fin de semana?`,
      `Pancakes de masa madre con frutos rojos 🥞. ¿Los pedimos con mimosa?`,
      `El brunch más Instagram-able de la ciudad 📸. ¿Para cuántas personas?`,
      `Waffles, huevos benedictinos y avocado toast en el mismo lugar 😍`,
      `¿Prefieres algo dulce o salado para empezar? Tenemos las dos opciones 😊`,
    ],
    empanadas:    [
      `¿Para llevar o comer aquí? 🫓 Siempre hay rellenos recién salidos del horno.`,
      `Más de 20 rellenos. ¿Cuál es tu preferido? 😋`,
      `Las de camarones y jalapeño son las más pedidas esta semana 🔥. ¿Las pruebas?`,
      `También hacemos pedidos de docenas para eventos 🎉. ¿Necesitas para alguna celebración?`,
      `Fritas o al horno. ¿Cuál prefieres? Ambas están deliciosas 😄`,
    ],
    jugos:        [
      `¿Qué necesita tu cuerpo hoy? 🥤 ¿Energía, vitaminas o detox?`,
      `Shot de jengibre para empezar el día con todo 💪. ¿Lo añadimos al pedido?`,
      `Acai bowl con granola y frutas frescas 🍓. El desayuno más completo.`,
      `Todo sin azúcar añadida. ¿Tienes alguna fruta que no te guste? 😊`,
      `El smoothie verde de espinaca, piña y jengibre está arrasando hoy 🌿`,
    ],
    asiatico:     [
      `Wok al fuego vivo 🔥. ¿China, japonés o vietnamita hoy?`,
      `El pho de hoy viene con fideos frescos y caldo de 6 horas 🍜. ¿Lo prueban?`,
      `Los baos de cerdo BBQ son el hit del menú 🥟. ¿Cuántos pedimos?`,
      `¿Tienes alergias a mariscos o soya? Te ayudamos a elegir sin problema 🌏`,
      `Dim sum de domingo: clásico que no falla 😄. ¿Para cuántos?`,
    ],
    panameno:     [
      `El sancocho de hoy huele como el de la abuela 🍲. ¿Para cuántos?`,
      `Arroz con pollo, patacones y ensalada. El clásico panameño 🇵🇦. ¿Lo apartamos?`,
      `¿Cuándo fue la última vez que comiste bienmesabe? 😋 Lo tenemos.`,
      `Comida criolla auténtica, sin atajos. ¿Para comer aquí o llevar?`,
      `También tenemos yuca frita y hojaldre. Acompañan perfecto 🏡`,
    ],
    dulceria:     [
      `Las cocadas de hoy salieron con coco fresco 🥥. ¿Quieres probar?`,
      `¿Para regalo o para ti? 🎁 Armamos cajas personalizadas.`,
      `Alfajores, polvorones y dulce de leche artesanal 🍬. ¿Cuál es tu favorito?`,
      `Dulces tradicionales panameños que ya no se encuentran fácil. ¿Los recuerdas? 😄`,
      `También hacemos pedidos especiales para bodas y eventos 🎉`,
    ],
    dental:       [
      `¿Cuándo fue tu última revisión? 🦷 La limpieza preventiva es clave.`,
      `Sonrisa bonita = confianza. ¿Quieres consultar sobre blanqueamiento? ✨`,
      `Ortodoncia invisible disponible. ¿Tienes alguna consulta específica? 😁`,
      `Tecnología digital para diagnósticos precisos y sin dolor 🩺. ¿Agendamos?`,
      `¿Tienes seguro médico? Trabajamos con varias aseguradoras. Consultemos 📋`,
    ],
    spa:          [
      `¿Cuándo fue tu último masaje? 💆 Tu cuerpo lo necesita.`,
      `Aromaterapia + masaje: la combinación perfecta contra el estrés 🕯️. ¿Agendamos?`,
      `Paquete de pareja disponible. ¿Lo planificamos para el fin de semana? 🌸`,
      `Primer masaje con 15% de descuento. ¿Es tu primera vez aquí? ✨`,
      `El facial hidratante deja la piel como nueva 🌟. ¿Te interesa?`,
    ],
    gym:          [
      `¿Cuándo empezamos? 💪 El mejor día es hoy.`,
      `3 días de prueba gratis sin compromiso 🎉. ¿Cuándo puedes venir?`,
      `¿Quieres bajar de peso, ganar músculo o simplemente moverte más? Tenemos un plan 🏋️`,
      `Clases de yoga mañana a las 7am. ¿Te apuntas? 🧘`,
      `Entrenador personal disponible para tu primera rutina 😊. ¿Qué objetivo tienes?`,
    ],
    mecanica:     [
      `¿Qué síntoma tiene tu vehículo? Cuéntanos y lo revisamos 🔧`,
      `Diagnóstico computarizado gratis esta semana ⚡. ¿Lo traes hoy?`,
      `¿Cuándo fue el último cambio de aceite? Lo revisamos sin costo 🚗`,
      `Mecánicos certificados con años de experiencia. ¿Qué modelo es tu carro? ⚙️`,
      `Si suena raro o jala hacia un lado, mejor revisarlo pronto 🛠️. ¿Cuándo puedes traerlo?`,
    ],
    transporte_ejecutivo:[
      `¿A dónde necesitas ir? 🚗 Choferes certificados y vehículos premium.`,
      `Servicio 24 horas, 365 días. ¿Para cuándo necesitas el traslado? 🛫`,
      `Aeropuerto, hotel, eventos o tour privado. Lo que necesites 😊`,
      `Flota moderna, puntualidad garantizada. ¿Cuántas personas son? 🚐`,
      `¿Tienes un vuelo pronto? Te recogemos con tiempo de sobra ✈️`,
    ],
    tours:        [
      `¿Primera vez en la ciudad o quieres descubrir más? 🗺️`,
      `Casco Viejo, Canal de Panamá y los barrios más emblemáticos. ¿Qué te interesa? ✨`,
      `Guías bilingües en español e inglés. ¿Qué idioma prefieres? 🌍`,
      `Grupos pequeños para experiencia personalizada. ¿Para cuántos son? 🎒`,
      `¿Cuántos días estarás en Panamá? Armamos el tour ideal para tu tiempo 😊`,
    ],
    fotografia:   [
      `¿Para qué tipo de sesión nos contactas? 📸 ¿Retratos, familia, eventos o productos?`,
      `Edición profesional incluida en todos los paquetes. ¿Cuándo necesitas las fotos? 🖼️`,
      `Sesión de graduación, quinceañera, boda o empresarial 🎓. ¿Cuál es tu ocasión?`,
      `Estudio profesional con fondos ilimitados. ¿Lo visitamos primero? ✨`,
      `¿Viste algún estilo fotográfico que te guste? Tráenos referencias 😊`,
    ],
    libreria:     [
      `¿Buscas algo en especial o vienes a explorar? 📚 Ambas opciones son bienvenidas.`,
      `Literatura latinoamericana, ciencia ficción y cómics. ¿Cuál es tu género? 🌎`,
      `Eventos literarios mensuales y club de lectura activo. ¿Te interesa unirte? 📖`,
      `Tenemos títulos difíciles de encontrar en otras librerías. ¿Buscas algo específico? 🔍`,
      `¿Es para regalo? Te ayudamos a elegir según los gustos de quien lo recibirá 🎁`,
    ],
    ferreteria:   [
      `¿Qué proyecto tienes en mente? 🔨 Te ayudamos con todo lo que necesitas.`,
      `Herramientas, materiales y asesoramiento. ¿Vienes hoy? 🏠`,
      `¿Plomería, electricidad o carpintería? Tenemos todo 🔧. ¿De qué se trata el trabajo?`,
      `Asesoramiento personalizado sin costo. ¿Qué vas a construir? 💡`,
      `¿Es urgente o planificado? Si es urgente podemos darte prioridad hoy ⚡`,
    ],
  };

  // Fallback por categoría (si no hay subtipo específico)
  const catFb = {
    restaurantes: [`¿Mesa para comer aquí, para llevar o delivery? 🍽️`, `¿Qué tipo de comida te provoca hoy? Dinos y te orientamos 😋`, `¿Celebrando algo especial? Cuéntanos para preparar algo personalizado 🎂`, `¿Tienes alguna restricción alimentaria? Te ayudamos a elegir 🥗`],
    belleza:      [`¿Cambio de look o mantenimiento? Cuéntanos tu idea ✨`, `¿Primera vez aquí? La consulta inicial es gratis 💇`, `¿Viste algo en Instagram? Tráenos la foto y lo recreamos 📸`, `Productos profesionales para el mejor resultado 🌿`],
    salud:        [`¿Consulta, examen o tratamiento? 🏥 Cuéntanos para orientarte.`, `¿Es urgente o consulta programada? Te ayudamos 🚑`, `Trae tu seguro médico si tienes. Trabajamos con varias aseguradoras 📋`],
    tecnologia:   [`¿Qué equipo necesitas reparar? 💻`, `Diagnóstico gratuito y sin compromiso 🔧. ¿Lo traes hoy?`, `¿Cayó al agua, pantalla rota o no enciende? Cuéntanos los síntomas 📱`],
    hogar:        [`¿Qué trabajo necesitas en tu hogar? 🏠`, `Presupuesto sin costo. ¿Describimos el trabajo? 📋`, `Plomería, electricidad, pintura y remodelaciones 🔨`],
    turismo:      [`¿Tours locales o experiencias de aventura? ✈️`, `¿Para cuántas personas y cuándo planeas el viaje? 🗓️`, `Guías bilingües disponibles. ¿Qué destino te interesa? 🗺️`],
    transporte:   [`¿Para qué fecha y destino necesitas el servicio? 🚗`, `¿Aeropuerto o ruta específica? Cuéntanos 🛫`, `Sedanes, SUVs y vans disponibles. ¿Cuántas personas? 🚐`],
    ropa:         [`¿Casual, formal, sport o para una ocasión especial? 👗`, `¿Cuál es tu talla? Verificamos disponibilidad 👕`, `¿Es para regalo? Empaque especial sin costo 🎁`],
    deportes:     [`¿Qué deporte practicas o qué equipo necesitas? 🏋️`, `¿Principiante o con experiencia? Así te recomendamos mejor 🎽`, `Marcas originales con garantía. ¿Tienes marca preferida? ⚽`],
  };

  return _pick(subFb[sub] || catFb[cat] || [
    `¡Gracias por escribir a ${bizName}! 😊 ¿En qué podemos ayudarte?`,
    `Recibimos tu mensaje. ¿Puedes contarnos más? 🙏`,
    `¡Con gusto te atendemos! ¿Qué necesitas exactamente?`,
    `Estamos aquí para ayudarte ✅. ¿Cuéntanos?`,
  ]);
}


/* ================================================================
   CHAT: REACCIONES Y MENÚ CONTEXTUAL DE MENSAJES
   ================================================================ */

// Emojis de reacción rápida (mismos que WhatsApp)
const QUICK_REACTIONS = ['👍','❤️','😂','😮','😢','🙏'];

// Estado interno del contexto activo
let _ctxBizId  = null;   // bizId del chat activo
let _ctxMsgId  = null;   // id del mensaje sobre el que se abrió el menú
let _ctxIsOut  = false;  // si el mensaje es del usuario (outgoing)

// ---- Guardar / leer reacciones en localStorage ----
function _getReactions(bizId) {
  try { return JSON.parse(localStorage.getItem('fynderReactions_' + bizId) || '{}'); }
  catch(e) { return {}; }
}
function _saveReactions(bizId, obj) {
  localStorage.setItem('fynderReactions_' + bizId, JSON.stringify(obj));
}

// ---- Añadir/quitar reacción a un mensaje ----
function toggleMsgReaction(bizId, msgId, emoji) {
  const reactions = _getReactions(bizId);
  if (!reactions[msgId]) reactions[msgId] = {};
  const mine = reactions[msgId]['__mine__'];
  if (mine === emoji) {
    // quitar
    delete reactions[msgId]['__mine__'];
    if (reactions[msgId][emoji]) {
      reactions[msgId][emoji]--;
      if (reactions[msgId][emoji] <= 0) delete reactions[msgId][emoji];
    }
  } else {
    // quitar anterior si existía
    if (mine) {
      if (reactions[msgId][mine]) {
        reactions[msgId][mine]--;
        if (reactions[msgId][mine] <= 0) delete reactions[msgId][mine];
      }
    }
    // agregar nueva
    reactions[msgId]['__mine__'] = emoji;
    reactions[msgId][emoji] = (reactions[msgId][emoji] || 0) + 1;
  }
  _saveReactions(bizId, reactions);

  // Cerrar menú y re-renderizar
  closeMsgBubbleCtxMenu();
  if (typeof renderChatMessages === 'function' && _activeChatBizId === bizId) {
    renderChatMessages(bizId);
  }
}

// ---- Construir HTML de badges de reacción para un mensaje ----
function _buildReactionBadgesHTML(bizId, msgId) {
  const reactions = _getReactions(bizId);
  const msgReacts = reactions[msgId];
  if (!msgReacts) return '';
  const mine = msgReacts['__mine__'];
  const badges = Object.entries(msgReacts)
    .filter(([k]) => k !== '__mine__')
    .map(([emoji, count]) => {
      const isMine = mine === emoji ? 'mine' : '';
      return `<button class="chat-bubble-reaction-badge ${isMine}"
        onclick="event.stopPropagation();toggleMsgReaction('${bizId}','${msgId}','${emoji}')"
        title="${isMine ? 'Quitar reacción' : 'Reaccionar con ' + emoji}">
        ${emoji}${count > 1 ? `<span class="react-count">${count}</span>` : ''}
      </button>`;
    });
  if (!badges.length) return '';
  return `<div class="chat-bubble-reactions">${badges.join('')}</div>`;
}

// ---- Abrir menú contextual de burbuja ----
function openMsgBubbleCtxMenu(event, bizId, msgId, isOut) {
  event.preventDefault();
  event.stopPropagation();

  // Cerrar la barra de reacciones si estaba abierta
  _closeReactionBar();

  _ctxBizId = bizId;
  _ctxMsgId = msgId;
  _ctxIsOut = isOut;

  // Construir tira de reacciones
  const strip = document.getElementById('ctxReactionStrip');
  if (strip) {
    const reactions = _getReactions(bizId);
    const mine = reactions[msgId] && reactions[msgId]['__mine__'];
    strip.innerHTML = QUICK_REACTIONS.map(em => {
      const reacted = mine === em ? 'reacted' : '';
      return `<button class="chat-reaction-btn ${reacted}"
        onclick="toggleMsgReaction('${bizId}','${msgId}','${em}');closeMsgBubbleCtxMenu();"
        title="${em}">${em}</button>`;
    }).join('') +
    `<button class="react-more"
      onclick="closeMsgBubbleCtxMenu();openReactionEmojiPicker('${bizId}','${msgId}');"
      title="Más emojis">+</button>`;
  }

  // Actualizar etiqueta "Fijar" según estado actual
  const msgs = _getMsgs(bizId);
  const msg  = msgs.find(m => String(m.id) === String(msgId));
  const pinItem = document.querySelector('#msgBubbleCtxMenu .ctx-menu-item[onclick*="pin"]');
  if (pinItem && msg) {
    pinItem.innerHTML = msg.pinned
      ? `<i class="fas fa-thumbtack"></i> Desfijar`
      : `<i class="fas fa-thumbtack"></i> Fijar`;
  }
  const starItem = document.querySelector('#msgBubbleCtxMenu .ctx-menu-item[onclick*="star"]');
  if (starItem && msg) {
    starItem.innerHTML = msg.starred
      ? `<i class="fas fa-star" style="color:#f59e0b"></i> Quitar destacado`
      : `<i class="fas fa-star"></i> Destacar`;
  }

  // Posicionamiento
  const menu = document.getElementById('msgBubbleCtxMenu');
  if (!menu) return;
  menu.classList.remove('open');

  const x = event.clientX || (event.touches && event.touches[0].clientX) || 0;
  const y = event.clientY || (event.touches && event.touches[0].clientY) || 0;

  // Poner provisionalmente para medir tamaño
  menu.style.left = x + 'px';
  menu.style.top  = y + 'px';
  menu.classList.add('open');

  // Ajustar para que no se salga del viewport
  requestAnimationFrame(() => {
    const rect = menu.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    let finalX = x;
    let finalY = y;
    if (finalX + rect.width > vw - 8)  finalX = vw - rect.width - 8;
    if (finalY + rect.height > vh - 8) finalY = vh - rect.height - 8;
    if (finalX < 8) finalX = 8;
    if (finalY < 8) finalY = 8;
    menu.style.left = finalX + 'px';
    menu.style.top  = finalY  + 'px';
    menu.style.transformOrigin = isOut ? 'top right' : 'top left';
  });
}

// ---- Cerrar menú contextual ----
function closeMsgBubbleCtxMenu() {
  const menu = document.getElementById('msgBubbleCtxMenu');
  if (menu) menu.classList.remove('open');
  _ctxBizId = null;
  _ctxMsgId = null;
}

// ---- Ejecutar acción del menú ----
function chatCtxAction(action) {
  const bizId = _ctxBizId;
  const msgId = _ctxMsgId;
  closeMsgBubbleCtxMenu();
  if (!bizId || !msgId) return;

  const msgs = _getMsgs(bizId);
  const msg  = msgs.find(m => String(m.id) === String(msgId));
  if (!msg && action !== 'select') return;

  switch (action) {

    case 'reply': {
      // Mostrar barra de respuesta sobre el input
      const bar = _getOrCreateReplyBar();
      if (bar) {
        const preview = msg.text
          ? msg.text.slice(0, 60) + (msg.text.length > 60 ? '…' : '')
          : (msg.attach ? '📎 Adjunto' : '');
        bar.dataset.quoteId   = msgId;
        bar.dataset.quoteBizId = bizId;
        bar.querySelector('.reply-text').textContent = preview;
        bar.style.display = 'flex';
        // Foco al input
        const inp = document.getElementById('chatInput') || document.getElementById('chatInputMobile');
        if (inp) inp.focus();
      }
      break;
    }

    case 'copy': {
      const text = msg.text || (msg.attach ? msg.attach.name : '');
      if (text) {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(text).then(() => showToast('Mensaje copiado'));
        } else {
          // fallback
          const ta = document.createElement('textarea');
          ta.value = text;
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
          showToast('Mensaje copiado');
        }
      }
      break;
    }

    case 'forward': {
      const text = msg.text || '';
      // Abrir nueva conversación o simplemente copiar — mostramos toast informativo
      showToast('Mensaje copiado para reenviar', 'info');
      if (navigator.clipboard && text) navigator.clipboard.writeText(text);
      break;
    }

    case 'pin': {
      msg.pinned = !msg.pinned;
      _saveMsgs(bizId, msgs);
      showToast(msg.pinned ? '📌 Mensaje fijado' : 'Mensaje desfijado');
      if (typeof renderChatMessages === 'function') renderChatMessages(bizId);
      break;
    }

    case 'star': {
      msg.starred = !msg.starred;
      _saveMsgs(bizId, msgs);
      showToast(msg.starred ? '⭐ Mensaje destacado' : 'Destacado eliminado');
      if (typeof renderChatMessages === 'function') renderChatMessages(bizId);
      break;
    }

    case 'select': {
      // Entrar en modo selección y marcar este mensaje
      enterSelectMode(bizId, msgId);
      break;
    }

    case 'report': {
      showToast('Mensaje reportado', 'info');
      break;
    }

    case 'delete': {
      // Abrir modal estilo WhatsApp
      openDeleteMsgModal(bizId, msgId);
      break;
    }
  }
}

// ---- Barra de respuesta (reply bar) ----
function _getOrCreateReplyBar() {
  // Buscar input container del chat activo
  const inputWrap = document.querySelector('.chat-input-bar') ||
                    document.querySelector('.wa-input-bar')   ||
                    document.querySelector('#chatInputWrap');
  if (!inputWrap) return null;
  let bar = document.getElementById('chatReplyBar');
  if (!bar) {
    bar = document.createElement('div');
    bar.id = 'chatReplyBar';
    bar.className = 'chat-reply-bar';
    bar.style.display = 'none';
    bar.innerHTML = `<i class="fas fa-reply" style="color:var(--primary);font-size:.85rem;flex-shrink:0"></i>
      <span class="reply-text"></span>
      <button class="reply-close" onclick="dismissReplyBar()" title="Cancelar">
        <i class="fas fa-times"></i>
      </button>`;
    inputWrap.insertBefore(bar, inputWrap.firstChild);
  }
  return bar;
}

function dismissReplyBar() {
  const bar = document.getElementById('chatReplyBar');
  if (bar) { bar.style.display = 'none'; bar.dataset.quoteId = ''; }
}

// ---- Parche al renderizador: agrega reacciones, iconos de fijado/destacado,
//      y event listeners para hover-bar y menú contextual ----
(function patchRenderForReactions() {
  const _origRender = window._renderMsgsInto;
  if (!_origRender) return;

  window._renderMsgsInto = function(container, bizId) {
    _origRender.call(this, container, bizId);

    const msgs = _getMsgs(bizId);
    container.querySelectorAll('.chat-msg-row').forEach((row, i) => {
      const msg = msgs[i];
      if (!msg) return;
      const isOut = msg.from === 'user';
      const bubble = row.querySelector('.chat-bubble');
      if (!bubble) return;

      // 1. Ícono de fijado
      if (msg.pinned) {
        const meta = bubble.querySelector('.chat-bubble-meta');
        if (meta && !meta.querySelector('.chat-bubble-pinned-icon')) {
          const pin = document.createElement('span');
          pin.className = 'chat-bubble-pinned-icon';
          pin.innerHTML = '<i class="fas fa-thumbtack"></i>';
          pin.title = 'Fijado';
          meta.insertBefore(pin, meta.firstChild);
        }
      }

      // 2. Ícono de destacado
      if (msg.starred) {
        const meta = bubble.querySelector('.chat-bubble-meta');
        if (meta && !meta.querySelector('.chat-bubble-starred-icon')) {
          const star = document.createElement('span');
          star.className = 'chat-bubble-starred-icon';
          star.innerHTML = '<i class="fas fa-star"></i>';
          star.title = 'Destacado';
          meta.insertBefore(star, meta.firstChild);
        }
      }

      // 3. Cita (reply quote)
      if (msg.quoteText && !bubble.querySelector('.chat-bubble-quote')) {
        const quote = document.createElement('div');
        quote.className = 'chat-bubble-quote';
        quote.textContent = msg.quoteText;
        bubble.insertBefore(quote, bubble.firstChild);
      }

      // 4. Badges de reacciones — envolver bubble en .chat-bubble-wrap
      let wrap = bubble.closest('.chat-bubble-wrap');
      if (!wrap) {
        wrap = document.createElement('div');
        wrap.className = 'chat-bubble-wrap';
        bubble.parentNode.insertBefore(wrap, bubble);
        wrap.appendChild(bubble);
      }
      wrap.querySelectorAll('.chat-bubble-reactions').forEach(el => el.remove());
      row.classList.remove('has-reactions');
      const badgesHTML = _buildReactionBadgesHTML(bizId, msg.id);
      if (badgesHTML) {
        wrap.insertAdjacentHTML('beforeend', badgesHTML);
        row.classList.add('has-reactions');
      }

      // 5b. Botón chevron ∨ dentro del bubble (abre menú contextual completo)
      let wrapForChevron = bubble.closest('.chat-bubble-wrap') || bubble.parentElement;
      if (wrapForChevron && !wrapForChevron.querySelector('.chat-bubble-menu-btn')) {
        const chevron = document.createElement('button');
        chevron.className = 'chat-bubble-menu-btn';
        chevron.title = 'Opciones';
        chevron.innerHTML = '<i class="fas fa-chevron-down"></i>';
        chevron.addEventListener('click', (e) => {
          e.stopPropagation();
          openMsgBubbleCtxMenu(e, bizId, msg.id, isOut);
        });
        wrapForChevron.appendChild(chevron);
      }

      // 6. Clic derecho → menú contextual
      row.addEventListener('contextmenu', (e) => {
        openMsgBubbleCtxMenu(e, bizId, msg.id, isOut);
      });

      // 7. Long press (móvil) → menú contextual
      let _lpTimer = null;
      row.addEventListener('touchstart', (e) => {
        _lpTimer = setTimeout(() => openMsgBubbleCtxMenu(e, bizId, msg.id, isOut), 500);
      }, { passive: true });
      row.addEventListener('touchend',  () => clearTimeout(_lpTimer));
      row.addEventListener('touchmove', () => clearTimeout(_lpTimer));
    });
  };
})();

// ── Barra de reacciones flotante global (shared, one instance) ──────────────
let _reactBarBizId = null;
let _reactBarMsgId = null;

function _getOrCreateReactBar() {
  let bar = document.getElementById('globalReactionBar');
  if (!bar) {
    bar = document.createElement('div');
    bar.id = 'globalReactionBar';
    bar.className = 'chat-reaction-bar';
    document.body.appendChild(bar);
    // Cerrar al hacer clic fuera de la barra
    document.addEventListener('click', (e) => {
      if (!bar.contains(e.target)) _closeReactionBar();
    }, true);
  }
  return bar;
}

function _openReactionBar(triggerEvent, bizId, msgId, isOut, onClose) {
  const bar = _getOrCreateReactBar();
  _reactBarBizId = bizId;
  _reactBarMsgId = msgId;

  const reactions = _getReactions(bizId);
  const mine = reactions[msgId] && reactions[msgId]['__mine__'];

  bar.innerHTML = QUICK_REACTIONS.map(em => {
    const reacted = mine === em ? 'reacted' : '';
    return `<button class="chat-reaction-btn ${reacted}"
      onclick="event.stopPropagation();toggleMsgReaction('${bizId}','${msgId}','${em}');_closeReactionBar();"
      title="${em}">${em}</button>`;
  }).join('') +
  `<button class="react-more"
    onclick="event.stopPropagation();_closeReactionBar();openReactionEmojiPicker('${bizId}','${msgId}');"
    title="Más emojis">+</button>`;

  // Guardar callback para cuando se cierre
  bar._onClose = onClose || null;

  // Posicionar encima del botón que la disparó
  bar.classList.remove('open');
  bar.style.visibility = 'hidden';
  bar.classList.add('open');

  requestAnimationFrame(() => {
    const btnRect = triggerEvent.currentTarget
      ? triggerEvent.currentTarget.getBoundingClientRect()
      : { left: triggerEvent.clientX, top: triggerEvent.clientY, width: 0, height: 0 };
    const barRect = bar.getBoundingClientRect();
    const vw = window.innerWidth;

    let x = isOut
      ? btnRect.left - barRect.width + btnRect.width + 8
      : btnRect.left - 8;
    let y = btnRect.top - barRect.height - 8;

    if (x + barRect.width > vw - 8) x = vw - barRect.width - 8;
    if (x < 8) x = 8;
    if (y < 8) y = btnRect.bottom + 8;

    bar.style.left       = x + 'px';
    bar.style.top        = y + 'px';
    bar.style.visibility = '';
  });
}

function _closeReactionBar() {
  const bar = document.getElementById('globalReactionBar');
  if (bar) {
    if (typeof bar._onClose === 'function') bar._onClose();
    bar._onClose = null;
    bar.classList.remove('open');
  }
  _reactBarBizId = null;
  _reactBarMsgId = null;
}

/* ================================================================
   PICKER DE EMOJIS PARA REACCIONES (botón "+")
   Reutiliza el emoji picker existente pero en modo reacción:
   al seleccionar un emoji se aplica como reacción al mensaje
   en lugar de insertarlo en el input.
   ================================================================ */

// Estado del modo reacción
let _reactionPickerBizId = null;
let _reactionPickerMsgId = null;

function openReactionEmojiPicker(bizId, msgId) {
  _reactionPickerBizId = bizId;
  _reactionPickerMsgId = msgId;

  // Construir tabs si no existen
  const tabsEl = document.getElementById('emojiPickerTabs');
  if (tabsEl && !tabsEl.children.length) {
    tabsEl.innerHTML = EMOJI_CATS.map((cat, i) =>
      `<button class="emoji-tab-btn${i === 0 ? ' active' : ''}" onclick="emojiSelectCat(${i})" title="${cat.label}">${cat.icon}</button>`
    ).join('');
  }

  // Parchar temporalmente insertEmoji para que en vez de insertar al input,
  // aplique la reacción al mensaje activo
  window._prevInsertEmoji = window.insertEmoji;
  window.insertEmoji = function(emoji) {
    if (_reactionPickerBizId && _reactionPickerMsgId) {
      toggleMsgReaction(_reactionPickerBizId, _reactionPickerMsgId, emoji);
    }
    // Restaurar comportamiento normal y cerrar picker
    window.insertEmoji = window._prevInsertEmoji;
    _reactionPickerBizId = null;
    _reactionPickerMsgId = null;
    closeEmojiPicker();
  };

  // Mostrar título de "Escoge una reacción" en el picker
  const picker = document.getElementById('emojiPicker');
  if (picker) {
    let lbl = picker.querySelector('.emoji-reaction-label');
    if (!lbl) {
      lbl = document.createElement('div');
      lbl.className = 'emoji-reaction-label';
      picker.insertBefore(lbl, picker.firstChild);
    }
    lbl.textContent = 'Escoge una reacción';
    lbl.style.cssText = 'font-size:.75rem;color:var(--primary,#67b8b4);font-weight:600;padding:6px 12px 0;';
  }

  // Renderizar primera categoría y abrir
  renderEmojiCat(0);
  document.getElementById('emojiSearch').value = '';
  document.getElementById('emojiOverlay').classList.add('open');
  document.getElementById('emojiPicker').classList.add('open');

  // Al cerrar el overlay (clic en overlay o Escape) restaurar insertEmoji
  const overlayEl = document.getElementById('emojiOverlay');
  const _restore = () => {
    if (window.insertEmoji !== window._prevInsertEmoji && window._prevInsertEmoji) {
      window.insertEmoji = window._prevInsertEmoji;
    }
    _reactionPickerBizId = null;
    _reactionPickerMsgId = null;
    // quitar el label
    const lbl = document.getElementById('emojiPicker')?.querySelector('.emoji-reaction-label');
    if (lbl) lbl.remove();
    overlayEl.removeEventListener('click', _restore);
  };
  overlayEl.addEventListener('click', _restore, { once: true });
}

// ---- Cerrar menú al hacer clic fuera ----
document.addEventListener('click', (e) => {
  const menu = document.getElementById('msgBubbleCtxMenu');
  if (menu && menu.classList.contains('open') && !menu.contains(e.target)) {
    closeMsgBubbleCtxMenu();
  }
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeMsgBubbleCtxMenu();
    // Si el picker estaba en modo reacción, restaurar insertEmoji
    if (_reactionPickerBizId && window._prevInsertEmoji) {
      window.insertEmoji = window._prevInsertEmoji;
      _reactionPickerBizId = null;
      _reactionPickerMsgId = null;
    }
  }
});


/* ================================================================
   ELIMINAR MENSAJE ESTILO WHATSAPP
   Modal con "Eliminar para todos" / "Eliminar para mí"
   ================================================================ */

let _deleteMsgBizId = null;
let _deleteMsgId    = null;

function openDeleteMsgModal(bizId, msgId) {
  _deleteMsgBizId = bizId;
  _deleteMsgId    = msgId;
  const overlay = document.getElementById('deleteMsgOverlay');
  const modal   = document.getElementById('deleteMsgModal');
  if (!overlay || !modal) return;
  overlay.style.display = 'block';
  modal.style.display   = 'block';
}

function closeDeleteMsgModal() {
  const overlay = document.getElementById('deleteMsgOverlay');
  const modal   = document.getElementById('deleteMsgModal');
  if (overlay) overlay.style.display = 'none';
  if (modal)   modal.style.display   = 'none';
  _deleteMsgBizId = null;
  _deleteMsgId    = null;
}

function confirmDeleteMsg(type) {
  const bizId = _deleteMsgBizId;
  const msgId = _deleteMsgId;
  closeDeleteMsgModal();
  if (!bizId || !msgId) return;

  const msgs = _getMsgs(bizId);
  const msg  = msgs.find(m => String(m.id) === String(msgId));
  if (!msg) return;

  if (type === 'me') {
    // Solo para mí: marcar como hidden, no se renderiza
    msg.deletedForMe = true;
    _saveMsgs(bizId, msgs);
    showToast('Mensaje eliminado');
  } else {
    // Para todos: reemplazar contenido con aviso
    msg.deletedForAll = true;
    msg.text  = '';
    msg.attach = null;
    _saveMsgs(bizId, msgs);
    showToast('Mensaje eliminado para todos');
  }

  // Re-renderizar
  const _rf = window.innerWidth >= 769 ? renderChatMessages : renderChatMessagesMobile;
  if (typeof _rf === 'function') _rf(bizId);
}

/* ================================================================
   MODO SELECCIÓN DE MENSAJES
   Checkboxes + barra inferior con "X seleccionados"
   ================================================================ */

let _selectModeBizId  = null;
const _selectedMsgIds = new Set();

function enterSelectMode(bizId, firstMsgId) {
  _selectModeBizId = bizId;
  _selectedMsgIds.clear();
  if (firstMsgId) _selectedMsgIds.add(String(firstMsgId));

  document.body.classList.add('select-mode');
  _renderSelectCheckboxes(bizId);
  _updateSelectBar();
  document.getElementById('msgSelectBar').style.display = 'flex';
}

function exitSelectMode() {
  document.body.classList.remove('select-mode');
  _selectedMsgIds.clear();
  _selectModeBizId = null;

  // Quitar checkboxes del DOM
  document.querySelectorAll('.msg-checkbox').forEach(el => el.remove());
  document.querySelectorAll('.chat-msg-row').forEach(r => r.classList.remove('selected-msg'));
  document.getElementById('msgSelectBar').style.display = 'none';
}

function _renderSelectCheckboxes(bizId) {
  const msgs = _getMsgs(bizId);
  const containers = [
    document.getElementById('chatMessages'),
    document.getElementById('chatMessagesMobile')
  ];
  containers.forEach(container => {
    if (!container) return;
    container.querySelectorAll('.chat-msg-row').forEach((row, i) => {
      if (row.querySelector('.msg-checkbox')) return;
      const msg = msgs[i];
      if (!msg) return;
      const cb = document.createElement('input');
      cb.type  = 'checkbox';
      cb.className = 'msg-checkbox';
      cb.checked   = _selectedMsgIds.has(String(msg.id));
      cb.addEventListener('change', () => {
        if (cb.checked) {
          _selectedMsgIds.add(String(msg.id));
          row.classList.add('selected-msg');
        } else {
          _selectedMsgIds.delete(String(msg.id));
          row.classList.remove('selected-msg');
        }
        _updateSelectBar();
      });
      if (row.classList.contains('out')) {
        row.appendChild(cb);
      } else {
        row.insertBefore(cb, row.firstChild);
      }
      // Marcar si ya estaba seleccionado
      if (_selectedMsgIds.has(String(msg.id))) row.classList.add('selected-msg');
    });
  });
}

function _updateSelectBar() {
  const n = _selectedMsgIds.size;
  const countEl = document.getElementById('msgSelectCount');
  if (countEl) countEl.textContent = `${n} seleccionado${n !== 1 ? 's' : ''}`;
  // Habilitar/deshabilitar botones según si hay selección
  document.querySelectorAll('.msg-select-action').forEach(btn => {
    btn.style.opacity = n > 0 ? '1' : '.35';
    btn.disabled = n === 0;
  });
}

function deleteSelectedMsgs() {
  if (!_selectModeBizId || !_selectedMsgIds.size) return;
  openDeleteMsgModal(_selectModeBizId, [..._selectedMsgIds][0]);
  // Sobreescribir temporalmente confirmDeleteMsg para manejar múltiples mensajes
  const _origConfirm = window.confirmDeleteMsg;
  window.confirmDeleteMsg = function(type) {
    window.confirmDeleteMsg = _origConfirm;
    const bizId = _deleteMsgBizId;
    closeDeleteMsgModal();
    if (!bizId) return;
    const msgs = _getMsgs(bizId);
    _selectedMsgIds.forEach(mid => {
      const m = msgs.find(x => String(x.id) === String(mid));
      if (!m) return;
      if (type === 'me') {
        m.deletedForMe = true;
      } else {
        m.deletedForAll = true;
        m.text  = '';
        m.attach = null;
      }
    });
    _saveMsgs(bizId, msgs);
    showToast(type === 'me' ? 'Mensajes eliminados' : 'Mensajes eliminados para todos');
    exitSelectMode();
    const _rf = window.innerWidth >= 769 ? renderChatMessages : renderChatMessagesMobile;
    if (typeof _rf === 'function') _rf(bizId);
  };
}

function shareSelectedMsgs() {
  if (!_selectedMsgIds.size) return;
  const bizId = _selectModeBizId;
  const msgs  = _getMsgs(bizId);
  const texts = [..._selectedMsgIds].map(mid => {
    const m = msgs.find(x => String(x.id) === String(mid));
    if (!m || m.deletedForMe || m.deletedForAll) return null;
    const who = m.from === 'user' ? 'Yo' : 'Negocio';
    return `[${m.time}] ${who}: ${m.text || '[Adjunto]'}`;
  }).filter(Boolean);

  const shareText = texts.join('\n');
  if (navigator.share) {
    navigator.share({ text: shareText }).catch(() => {});
  } else if (navigator.clipboard) {
    navigator.clipboard.writeText(shareText);
    showToast(`${_selectedMsgIds.size} mensaje${_selectedMsgIds.size !== 1 ? 's' : ''} copiado${_selectedMsgIds.size !== 1 ? 's' : ''}`);
  }
  exitSelectMode();
}

// Parche al renderizador para omitir mensajes eliminados para mí
// y mostrar el bubble especial para "eliminado para todos"
(function patchRenderForDeleted() {
  const _prev = window._renderMsgsInto;
  if (!_prev) return;
  window._renderMsgsInto = function(container, bizId) {
    // Filtrar temporalmente los deletedForMe antes de renderizar
    const _origGet = window._getMsgs;
    window._getMsgs = function(id) {
      const all = _origGet(id);
      return all.filter(m => !m.deletedForMe);
    };
    _prev.call(this, container, bizId);
    window._getMsgs = _origGet;

    // Marcar bubbles deletedForAll con clase especial
    const allMsgs = _origGet(bizId).filter(m => !m.deletedForMe);
    container.querySelectorAll('.chat-msg-row').forEach((row, i) => {
      const msg = allMsgs[i];
      if (!msg || !msg.deletedForAll) return;
      const bubble = row.querySelector('.chat-bubble');
      if (!bubble) return;
      bubble.classList.add('deleted-for-all');
      // Reemplazar contenido con el aviso
      const isOut = msg.from === 'user';
      const icon  = isOut ? '🚫' : '🚫';
      const label = isOut ? 'Eliminaste este mensaje.' : 'Se eliminó este mensaje.';
      // Preservar solo la meta (tiempo + ticks)
      const meta = bubble.querySelector('.chat-bubble-meta');
      bubble.innerHTML = `<span style="opacity:.7">${icon} ${label}</span>`;
      if (meta) bubble.appendChild(meta);
    });

    // Re-aplicar checkboxes si estamos en modo selección
    if (document.body.classList.contains('select-mode') && _selectModeBizId === bizId) {
      _renderSelectCheckboxes(bizId);
    }
  };
})();
