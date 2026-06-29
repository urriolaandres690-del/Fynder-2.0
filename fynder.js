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
{id:"1",name:"Pastelería Luna",category:"Restaurantes",categoryId:"restaurantes",description:"Pasteles artesanales elaborados con ingredientes frescos y locales. Especialidad en tortas personalizadas para bodas, cumpleaños y eventos especiales. Cada pieza es una obra de arte comestible.",address:"Calle Principal 45, Centro",hours:"Lun–Sáb 8:00am – 8:00pm",rating:4.9,reviews:312,image:"https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=80&h=80&fit=crop&auto=format",phone:"+507 6234-5678",instagram:"@pasteleria_luna",facebook:"PasteleriaLuna",tags:["Pasteles","Tortas","Repostería","Personalizado"],isNew:false,isFeatured:true,isPopular:true,mapQuery:"Calle+Principal+45+Centro"},{id:"2",name:"Salón Belleza Mía",category:"Belleza",categoryId:"belleza",description:"Tu espacio de transformación personal. Ofrecemos cortes, coloración, tratamientos capilares, manicure y pedicure con los mejores productos del mercado.",address:"Av. Las Flores 120, Zona Rosa",hours:"Mar–Dom 9:00am – 7:00pm",rating:4.7,reviews:198,image:"https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=80&h=80&fit=crop&auto=format",phone:"+507 6345-6789",instagram:"@belleza_mia_salon",tags:["Cortes","Coloración","Manicure","Spa"],isNew:true,isFeatured:true,mapQuery:"Avenida+Las+Flores+120+Zona+Rosa"},
{id:"3",name:"TechPoint",category:"Tecnología",categoryId:"tecnologia",description:"Venta y reparación de dispositivos electrónicos. Smartphones, laptops, tablets y accesorios. Servicio técnico certificado con garantía extendida.",address:"Centro Comercial Plaza, Local 32",hours:"Lun–Sáb 9:00am – 6:00pm",rating:4.5,reviews:87,image:"https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1565211604822-2641d0b081a6?w=80&h=80&fit=crop&auto=format",phone:"+507 6456-7890",website:"techpoint.local",facebook:"TechPointStore",tags:["Reparación","Smartphones","Laptops","Accesorios"],isPopular:true,mapQuery:"Centro+Comercial+Plaza+Panama"},
{id:"5",name:"Dulce Hogar",category:"Restaurantes",categoryId:"restaurantes",description:"Panadería y repostería artesanal con recetas tradicionales de abuela. Pan fresco cada mañana, galletas, brownies y postres caseros que enamoran.",address:"Barrio El Jardín, Calle 3 #12",hours:"Lun–Sáb 7:00am – 6:00pm",rating:4.6,reviews:156,image:"https://images.unsplash.com/photo-1568254183919-78a4f43a2877?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1509440159596-0249088772ff?w=80&h=80&fit=crop&auto=format",phone:"+507 6678-9012",facebook:"DulceHogarBakery",tags:["Pan","Galletas","Postres","Artesanal"],isNew:true,mapQuery:"Barrio+El+Jardin+Calle+3"},
{id:"6",name:"Clínica Salud Total",category:"Salud",categoryId:"salud",description:"Atención médica integral con especialistas en medicina general, pediatría, nutrición y fisioterapia. Consultas presenciales y telemedicina disponible.",address:"Av. Salud 200, Col. Médica",hours:"Lun–Vie 8:00am – 5:00pm",rating:4.4,reviews:73,image:"https://images.unsplash.com/photo-1578474846511-04ba529f0b88?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1559757175-5700dde675bc?w=80&h=80&fit=crop&auto=format",phone:"+507 6789-0123",website:"saludtotal.med",tags:["Médicos","Pediatría","Nutrición","Telemedicina"],isFeatured:true,mapQuery:"Avenida+Salud+200+Panama"},
{id:"7",name:"ModaUrbana",category:"Ropa",categoryId:"ropa",description:"Boutique de moda contemporánea con las últimas tendencias para hombre y mujer. Diseños exclusivos, marcas locales y ropa importada a precios accesibles.",address:"Paseo Comercial, Local 45-B",hours:"Lun–Sáb 10:00am – 8:00pm",rating:4.3,reviews:64,image:"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=80&h=80&fit=crop&auto=format",phone:"+507 6890-1234",instagram:"@modaurbana_oficial",tags:["Moda","Ropa","Boutique","Tendencias"],isNew:true,isPopular:true,mapQuery:"Paseo+Comercial+Panama"},
{id:"8",name:"Repostería María",category:"Restaurantes",categoryId:"restaurantes",description:"Postres y pasteles personalizados para toda ocasión. Especialidad en cheesecakes, macarons y tartas de temporada con ingredientes 100% naturales.",address:"Col. Las Palmas, Blvd. Norte 67",hours:"Mar–Dom 10:00am – 7:00pm",rating:4.8,reviews:241,image:"https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1486887396153-fa416526c108?w=80&h=80&fit=crop&auto=format",phone:"+507 6901-2345",instagram:"@reposteria_maria",facebook:"ReposteriaMaria",tags:["Pasteles","Cheesecake","Macarons","Natural"],isFeatured:true,isPopular:true,mapQuery:"Blvd+Norte+67+Panama"},
{id:"9",name:"Sushi Nikkei",category:"Restaurantes",categoryId:"restaurantes",description:"Auténtica fusión nikkei con ingredientes frescos del mercado. Rolls creativos, sashimi premium y ramen artesanal en un ambiente íntimo y moderno.",address:"Calle 50, Miraflores, Local 8",hours:"Mar–Dom 12:00pm – 10:00pm",rating:4.7,reviews:189,image:"https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=80&h=80&fit=crop&auto=format",phone:"+507 6312-4567",instagram:"@sushi_nikkei_ptv",tags:["Sushi","Ramen","Japonés","Fusión"],isFeatured:true,isNew:false,mapQuery:"Calle+50+Miraflores+Panama"},
{id:"10",name:"Spa Serenidad",category:"Salud",categoryId:"salud",description:"Centro de bienestar integral con masajes relajantes, faciales, tratamientos corporales y aromaterapia. Un oasis de paz en el corazón de la ciudad.",address:"Vía Argentina 33, El Cangrejo",hours:"Lun–Sáb 9:00am – 8:00pm",rating:4.9,reviews:276,image:"https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1544991060-b42da24bef4b?w=80&h=80&fit=crop&auto=format",phone:"+507 6423-8901",instagram:"@spa_serenidad",website:"spaserenidad.com",tags:["Masajes","Faciales","Bienestar","Aromaterapia"],isFeatured:true,isPopular:true,mapQuery:"Via+Argentina+33+El+Cangrejo+Panama"},
{id:"11",name:"Ferretería El Maestro",category:"Hogar",categoryId:"hogar",description:"Todo para tu hogar y construcción. Herramientas eléctricas y manuales, materiales de construcción, plomería y electricidad. Asesoramiento personalizado.",address:"Av. Balboa 78, Bella Vista",hours:"Lun–Sáb 7:00am – 7:00pm",rating:4.3,reviews:94,image:"https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=80&h=80&fit=crop&auto=format",phone:"+507 6534-2109",facebook:"FerreteriaElMaestro",tags:["Herramientas","Construcción","Plomería","Electricidad"],mapQuery:"Avenida+Balboa+78+Bella+Vista+Panama"},
{id:"12",name:"Heladería Tropical",category:"Restaurantes",categoryId:"restaurantes",description:"Helados artesanales con frutas tropicales de temporada. Más de 30 sabores únicos como maracuyá, guanábana, tamarindo y carambola. Sin colorantes artificiales.",address:"Calle Uruguay 15, San Felipe",hours:"Todos los días 11:00am – 10:00pm",rating:4.8,reviews:332,image:"https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1551248429-40975aa4de74?w=80&h=80&fit=crop&auto=format",phone:"+507 6645-3210",instagram:"@heladeria_tropical",facebook:"HeleaderiaLaTropical",tags:["Helados","Artesanal","Tropical","Natural"],isNew:true,isPopular:true,mapQuery:"Calle+Uruguay+15+San+Felipe+Panama"},
{id:"13",name:"Taller Auto Express",category:"Transporte",categoryId:"transporte",description:"Taller mecánico de confianza para todo tipo de vehículos. Diagnóstico computarizado, frenos, suspensión, cambio de aceite y mantenimiento general.",address:"Tumba Muerto, Calle F #23",hours:"Lun–Sáb 7:30am – 5:30pm",rating:4.2,reviews:118,image:"https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1542826391-ee6a9f1f93c4?w=80&h=80&fit=crop&auto=format",phone:"+507 6756-4321",facebook:"AutoExpressTaller",tags:["Mecánica","Frenos","Diagnóstico","Mantenimiento"],mapQuery:"Tumba+Muerto+Panama"},
{id:"14",name:"Librería Imaginarium",category:"Hogar",categoryId:"hogar",description:"Librería independiente especializada en literatura latinoamericana, ciencia ficción y cómics. Eventos literarios mensuales y club de lectura activo.",address:"Av. Federico Boyd 44, Paitilla",hours:"Mar–Dom 10:00am – 8:00pm",rating:4.7,reviews:143,image:"https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=80&h=80&fit=crop&auto=format",phone:"+507 6867-5432",instagram:"@imaginarium_libros",website:"librosimagines.com",tags:["Libros","Literatura","Cómics","Eventos"],isNew:true,mapQuery:"Avenida+Federico+Boyd+44+Paitilla+Panama"},
{id:"15",name:"City Tours Panamá",category:"Turismo",categoryId:"turismo",description:"Recorridos guiados por el casco histórico, el Canal y los barrios más emblemáticos. Tours en español e inglés. Grupos pequeños para una experiencia personalizada.",address:"Plaza de Francia, Casco Viejo",hours:"Todos los días 8:00am – 6:00pm",rating:4.8,reviews:267,image:"https://images.unsplash.com/photo-1548707309-dcebeab9ea9b?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=80&h=80&fit=crop&auto=format",phone:"+507 6978-6543",instagram:"@citytours_pty",website:"citytourspty.com",tags:["Tours","Historia","Canal","Casco Viejo"],isFeatured:true,isPopular:true,mapQuery:"Plaza+de+Francia+Casco+Viejo+Panama"},
{id:"16",name:"GymFit Centro",category:"Salud",categoryId:"salud",description:"Gimnasio moderno con equipos de última generación. Clases de spinning, yoga, zumba y crossfit. Entrenadores certificados y planes nutricionales personalizados.",address:"Calle 42, Bella Vista, Edificio Sport",hours:"Lun–Vie 5:00am – 10:00pm, Sáb–Dom 7:00am – 8:00pm",rating:4.5,reviews:201,image:"https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=80&h=80&fit=crop&auto=format",phone:"+507 6089-7654",instagram:"@gymfit_centro",facebook:"GymFitCentro",tags:["Gym","Crossfit","Yoga","Nutrición"],isNew:true,isPopular:true,mapQuery:"Calle+42+Bella+Vista+Panama"},
{id:"17",name:"Estudio Foto&Arte",category:"Turismo",categoryId:"turismo",description:"Estudio profesional de fotografía para retratos, eventos empresariales, sesiones familiares y productos. Edición profesional incluida en todos los paquetes.",address:"Calle Manuel Espinosa 12, San Francisco",hours:"Lun–Sáb 9:00am – 6:00pm",rating:4.6,reviews:88,image:"https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1452802447250-470a88ac82bc?w=80&h=80&fit=crop&auto=format",phone:"+507 6190-8765",instagram:"@fotoarte_pty",website:"fotoartestudio.com",tags:["Fotografía","Retratos","Eventos","Edición"],mapQuery:"Calle+Manuel+Espinosa+12+San+Francisco+Panama"},
{id:"18",name:"Cocina de la Abuela",category:"Restaurantes",categoryId:"restaurantes",description:"Restaurante familiar con recetas auténticas panameñas. Sancocho de gallina, arroz con pollo, patacones y postres caseros como el tembleque y la bienmesabe.",address:"Calle 10, El Chorrillo, Local 5",hours:"Lun–Dom 11:00am – 9:00pm",rating:4.7,reviews:348,image:"https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=80&h=80&fit=crop&auto=format",phone:"+507 6201-9876",facebook:"CocinaAbuelapty",tags:["Panameño","Sancocho","Familiar","Casero"],isPopular:true,mapQuery:"Calle+10+El+Chorrillo+Panama"},
{id:"19",name:"Computec Soluciones",category:"Tecnología",categoryId:"tecnologia",description:"Servicio técnico especializado en computadoras, redes empresariales e instalación de cámaras de seguridad. Atención a domicilio disponible en toda la ciudad.",address:"Av. Ricardo J. Alfaro, Torres del Sol, Of. 3B",hours:"Lun–Vie 8:00am – 6:00pm, Sáb 9:00am – 2:00pm",rating:4.4,reviews:76,image:"https://images.unsplash.com/photo-1588702547919-26089e690ecc?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=80&h=80&fit=crop&auto=format",phone:"+507 6312-0987",instagram:"@computec_pty",facebook:"ComputecSoluciones",tags:["Computadoras","Redes","Cámaras","Domicilio"],isNew:true,mapQuery:"Avenida+Ricardo+Alfaro+Panama"},
{id:"20",name:"Boutique Xclusive",category:"Ropa",categoryId:"ropa",description:"Ropa de diseñador local y marcas internacionales seleccionadas. Prendas exclusivas para mujer con servicio de estilismo personal incluido en cada compra.",address:"Mall Via Veneto, Local 112, El Dorado",hours:"Lun–Dom 10:00am – 9:00pm",rating:4.5,reviews:112,image:"https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=80&h=80&fit=crop&auto=format",phone:"+507 6423-1098",instagram:"@boutique_xclusive",tags:["Diseñador","Exclusivo","Mujer","Estilismo"],isPopular:true,mapQuery:"Mall+Via+Veneto+El+Dorado+Panama"},
{id:"21",name:"Transporte Ejecutivo GTR",category:"Transporte",categoryId:"transporte",description:"Servicio de transporte privado premium para ejecutivos, aeropuerto y eventos. Flota de vehículos modernos, choferes certificados y puntualidad garantizada.",address:"Punta Pacífica, Torre Global, Piso 1",hours:"Todos los días 24 horas",rating:4.6,reviews:159,image:"https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=80&h=80&fit=crop&auto=format",phone:"+507 6534-2109",instagram:"@gtr_panama",website:"gtrtransporte.com",tags:["Ejecutivo","Aeropuerto","Premium","24 horas"],isFeatured:true,mapQuery:"Punta+Pacifica+Panama"},
{id:"22",name:"Clínica Dental Sonrisas",category:"Salud",categoryId:"salud",description:"Odontología estética y general. Ortodoncia, blanqueamiento, implantes y limpiezas profesionales. Tecnología digital para diagnósticos precisos sin radiación innecesaria.",address:"Calle 50, San Francisco, Edificio Médico, Piso 3",hours:"Lun–Vie 8:00am – 6:00pm, Sáb 9:00am – 1:00pm",rating:4.8,reviews:183,image:"https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1559757175-5700dde675bc?w=80&h=80&fit=crop&auto=format",phone:"+507 6645-3210",instagram:"@clinica_sonrisas",website:"clinicasonrisas.com",tags:["Dental","Ortodoncia","Estética","Implantes"],isNew:true,isFeatured:true,mapQuery:"Calle+50+San+Francisco+Panama"},
/* ── RESTAURANTES adicionales (ids 23–53) ── */
{id:"23",name:"Tacos & Burritos",category:"Restaurantes",categoryId:"restaurantes",description:"Auténtica comida mexicana callejera con ingredientes frescos. Tacos de carne asada, al pastor, burritos y quesadillas con salsas caseras de distintos niveles de picante.",address:"Calle 48, El Cangrejo, Local 7",hours:"Mar–Dom 11:00am – 10:00pm",rating:4.5,reviews:203,image:"https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=80&h=80&fit=crop&auto=format",phone:"+507 6711-2233",instagram:"@tacos_burritos_pty",tags:["Mexicano","Tacos","Burritos","Picante"],isPopular:true,mapQuery:"Calle+48+El+Cangrejo+Panama"},
{id:"24",name:"Pizzería Napoli",category:"Restaurantes",categoryId:"restaurantes",description:"Pizza artesanal al horno de leña con masa madre fermentada 48 horas. Ingredientes importados de Italia y tomates San Marzano. Ambiente familiar y acogedor.",address:"Av. Balboa 112, Bella Vista",hours:"Lun–Dom 12:00pm – 11:00pm",rating:4.7,reviews:289,image:"https://images.unsplash.com/photo-1513104890138-7c749659a591?w=700&h=450&fit=crop&auto=format",logo:"https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=80&h=80&fit=crop&auto=format",phone:"+507 6722-3344",instagram:"@napoli_pty",facebook:"PizzeriaNapoliPanama",tags:["Pizza","Italiana","Horno de Leña","Artesanal"],isFeatured:true,isPopular:true,mapQuery:"Avenida+Balboa+112+Bella+Vista+Panama"},
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

// Cargar favoritos guardados en localStorage, filtrando IDs que ya no existen
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
  return`<div class="bcard" onclick="openModal('${b.id}')"><div class="bcard-img"><img src="${b.image}" alt="${b.name}" loading="lazy" onerror="this.closest('.bcard').style.display='none'"/><div class="bcard-img-overlay"></div>${badge}<button class="bcard-fav${isFav?' active':''}" onclick="event.stopPropagation();toggleFav('${b.id}')" data-fav-id="${b.id}" data-fav-size="md">${_heartSVG(isFav,'md')}</button></div><div class="bcard-body"><div class="bcard-row1"><span class="bcard-name">${b.name}</span><div class="bcard-rating"><svg style="width:12px;height:12px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><polygon fill="#F4D35E" stroke="#F4D35E" points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><span class="bcard-rating-val">${b.rating}</span></div></div><p class="bcard-desc line-clamp-2">${b.description}</p><div class="bcard-hours"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>${b.hours}</div><button class="bcard-btn" onclick="event.stopPropagation();openModal('${b.id}')">Ver más →</button></div></div>`;
}

function listCardHTML(b){
  const isFav=favorites.has(b.id);
  const tags=b.tags.slice(0,3).map(t=>`<span class="tag tag-teal">${t}</span>`).join('');
  return`<div class="bcard-list" onclick="openModal('${b.id}')"><div class="bcard-list-img"><img src="${b.image}" alt="${b.name}" loading="lazy" style="width:100%;height:100%;object-fit:cover" onerror="this.closest('.bcard-list').style.display='none'"/></div><div class="bcard-list-body"><div><div class="bcard-list-top"><span class="bcard-list-name">${b.name}</span><button onclick="event.stopPropagation();toggleFav('${b.id}')" style="background:none;border:none;cursor:pointer;flex-shrink:0;padding:2px" data-fav-id="${b.id}" data-fav-size="sm">${_heartSVG(isFav,'sm')}</button></div><p class="bcard-list-desc line-clamp-2">${b.description}</p><div class="bcard-list-tags">${tags}</div></div><div class="bcard-list-meta"><div class="bcard-list-meta-item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>${b.hours}</div><div class="bcard-list-meta-item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>${b.address.split(',')[0]}</div><div class="bcard-list-rating"><div class="stars">${starsHTML(b.rating)}</div><strong style="font-size:.75rem;color:#1F2937">${b.rating}</strong><span style="font-size:.75rem;color:#6B7280">(${b.reviews})</span></div></div></div></div>`;
}
function goPage(p){
    // Si la página no existe, ignorar silenciosamente
    const target = document.getElementById('page-'+p);
    if(!target){ console.warn('goPage: no existe page-'+p); return; }

    // Guardar la página anterior solo si NO es una página legal (para no perder el origen real)
    const legalPages = ['terms','privacy'];
    if(!legalPages.includes(currentPage)){
        previousPage = currentPage;
    }

    document.querySelectorAll('.page').forEach(x=>x.classList.remove('active'));
    target.classList.add('active');
    currentPage = p;

    const navbar  = document.getElementById('navbar');
    const noNavPages = ['login','register','terms','privacy'];
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

    updateNav();
    window.scrollTo({top:0,behavior:'smooth'});

    if(p==='directory') renderDirectory();
    if(p==='favorites') renderFavorites();
    if(p==='profile')   loadProfile();
    if(p==='dashboard') loadDashboard();
}

function goBack(){
    goPage(previousPage || 'home');
}

function updateNav(){
    const isHero = currentPage==='home' && !window.__scrolled;

    // Nav links activos + on-hero
    ['home','directory','favorites'].forEach(p=>{
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

    [logout, profile].forEach(el => { if(el) el.classList.toggle('on-hero', isHero); });
    if(login)  login.classList.toggle('on-hero', isHero);

    const tealBtn = document.querySelector('#navbar .btn-teal');
    if(tealBtn) tealBtn.classList.toggle('on-hero', isHero);

    if(uname) uname.classList.toggle('on-hero', isHero);

    // Badge de favoritos en navbar y contador en página de guardados
    const b=document.getElementById('navBadge');
    if(b){ b.textContent=favorites.size; b.style.display=favorites.size>0?'flex':'none'; }
    const fc=document.getElementById('favsCount');
    if(fc) fc.textContent=`${favorites.size} negocio${favorites.size!==1?'s':''} guardado${favorites.size!==1?'s':''}`;
}

function goDirectoryQuery(q,cat=''){document.getElementById('dirSearch').value=q;dirActiveCategory=cat;goPage('directory');} 

function heroSearchGo(){const q=document.getElementById('heroSearch').value.trim();goDirectoryQuery(q);} 

window.__scrolled=false; 

window.addEventListener('scroll',()=>{const s=window.scrollY>40;if(s!==window.__scrolled){window.__scrolled=s;document.getElementById('navbar').classList.toggle('scrolled',s);updateNav();}},{passive:true}); 

function toggleFav(id){
  favorites.has(id)?favorites.delete(id):favorites.add(id);
  localStorage.setItem('fynderFavorites',JSON.stringify([...favorites]));
  updateNav();
  refreshFavBtns(id);
  if(currentPage==='favorites') renderFavorites();
  if(modalBusinessId===id) updateModalFavBtn();
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

function renderModalReviews(bizId, cat){
  const wrap=document.getElementById('modalReviewsWrap');
  if(!wrap) return;
  wrap.style.display='block';
  const staticList=REVIEWS[bizId]||[];
  const userComments=_getBizComments(bizId);
  const color=cat?.color||'#67B8B4';

  // Construir el HTML de reseñas estáticas
  const staticHTML=staticList.map(r=>{
    const filled=r.stars;
    const stars=[1,2,3,4,5].map(i=>`<svg style="width:13px;height:13px;fill:${i<=filled?'#F4D35E':'#E5E7EB'};flex-shrink:0" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`).join('');
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
    </div>`;
  }).join('');

  // Construir el HTML de reseñas de usuario (mismo estilo review-card, sin estrellas)
  const logged=!!localStorage.getItem('fynderLogged');
  const user=JSON.parse(localStorage.getItem('fynderUser')||'null');
  const userHTML=userComments.slice().reverse().map(c=>{
    const isOwn=logged&&user&&c.userId===(user.email||user.name);
    let avStyle;
    if(c.avatarPhoto) {
      avStyle=`background:transparent;overflow:hidden;padding:0`;
      var avInner=`<img src="${c.avatarPhoto}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;display:block" alt="av">`;
    } else if(c.avatarPreset) {
      avStyle=`background:#F0FEFE;font-size:1rem`;
      var avInner=c.avatarPreset;
    } else {
      const bg=c.avatarInitBg||ART_COMMENT_COLORS[c.colorIdx||0];
      avStyle=`background:${bg};font-weight:700;font-size:.875rem;color:#fff;font-family:'Poppins',sans-serif`;
      var avInner=c.initial;
    }
    return `<div class="review-card" id="bizc-${c.id}">
      <div class="review-header">
        <div class="review-avatar" style="${avStyle}">${avInner}</div>
        <div class="review-meta">
          <span class="review-name">${c.name}</span>
          <div class="review-stars" style="height:14px"></div>
        </div>
        <span class="review-date">${c.date}</span>
        ${isOwn?`<button onclick="deleteBizComment('${bizId}','${c.id}')" title="Eliminar" style="background:none;border:none;cursor:pointer;color:#94A3B8;font-size:.75rem;padding:2px 4px;margin-left:4px"><i class="fas fa-trash-alt"></i></button>`:''}
      </div>
      <p class="review-text">${escapeHtml(c.text)}</p>
    </div>`;
  }).join('');

  const totalCount=staticList.length+userComments.length;

  wrap.innerHTML=`
    <p class="modal-section-title">Reseñas de clientes (${totalCount})</p>
    <div class="reviews-list" id="bizReviewsList">
      ${staticHTML}
      ${userHTML}
      ${totalCount===0?'<p style="font-size:.8125rem;color:var(--muted);text-align:center;padding:16px 0">Aún no hay reseñas. ¡Sé el primero!</p>':''}
    </div>
    <div style="margin-top:20px">
      <div style="display:flex;gap:10px;align-items:flex-start">
        <div style="flex-shrink:0;margin-top:2px">${_getUserAvatarHTML(36)}</div>
        <div style="flex:1">
          <textarea id="bizCommentInput" placeholder="Escribe tu reseña..." maxlength="400" rows="2"
            class="biz-review-textarea"
            style="width:100%;padding:10px 14px;border:1.5px solid var(--border);border-radius:14px;font-family:'Inter',sans-serif;font-size:.875rem;color:var(--fg);background:var(--bg);resize:none;outline:none;box-sizing:border-box;transition:border-color .2s"
            onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='var(--border)'"
          ></textarea>
          <div style="display:flex;justify-content:flex-end;margin-top:8px">
            <button onclick="submitBizComment('${bizId}')" style="padding:9px 20px;border-radius:12px;border:none;background:var(--primary);color:#fff;font-family:'Poppins',sans-serif;font-size:.8125rem;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:6px">
              <i class="fas fa-paper-plane"></i> Publicar reseña
            </button>
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
  const comment={id:Date.now().toString(),name,initial,userId,colorIdx,avatarPhoto,avatarPreset,avatarInitBg,text,date:dateStr};
  const comments=_getBizComments(bizId);
  comments.push(comment);
  _saveBizComments(bizId,comments);
  // Re-renderizar usando el bizId almacenado
  const b=BUSINESSES.find(x=>x.id===bizId)||BUSINESSES.find(x=>x.id===modalBusinessId);
  const cat=b?CATEGORIES.find(c=>c.id===b.categoryId):null;
  renderModalReviews(bizId,cat);
  showToast('¡Reseña publicada! ⭐');
}

function deleteBizComment(bizId,commentId){
  _saveBizComments(bizId,_getBizComments(bizId).filter(c=>c.id!==commentId));
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
  const loginCount=document.getElementById('loginNegociosCount');
  if(loginCount) loginCount.textContent=`+${total} negocios registrados`;
}

// ── Estimación global de usuarios (coherente en toda la app) ──
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

function buildDirCatFilters(){document.getElementById('dirCatFilters').innerHTML=`<button class="filter-chip ${!dirActiveCategory?'active':''}" onclick="setDirCat('')">Todos</button>`+CATEGORIES.map(c=>`<button class="filter-chip ${dirActiveCategory===c.id?'active':''}" onclick="setDirCat('${c.id}')" style="${dirActiveCategory===c.id?'background:'+c.color+';color:#fff;':''}">${c.label}</button>`).join('');initCatFiltersDrag();} 

function setDirCat(id){dirActiveCategory=id;buildDirCatFilters();renderDirectory();} 

function setView(v){dirViewMode=v;document.getElementById('viewGrid').classList.toggle('active',v==='grid');document.getElementById('viewList').classList.toggle('active',v==='list');renderDirectory();} 

function filterDir(){const v=document.getElementById('dirSearch').value;document.getElementById('dirClear').classList.toggle('hide',!v);renderDirectory();} 

function clearDirSearch(){document.getElementById('dirSearch').value='';document.getElementById('dirClear').classList.add('hide');renderDirectory();} 

function renderDirectory(){buildDirCatFilters();const q=document.getElementById('dirSearch').value.toLowerCase().trim();const res=BUSINESSES.filter(b=>{const mc=!dirActiveCategory||b.categoryId===dirActiveCategory;const mq=!q||b.name.toLowerCase().includes(q)||b.category.toLowerCase().includes(q)||b.tags.some(t=>t.toLowerCase().includes(q))||b.description.toLowerCase().includes(q);return mc&&mq;});const cl=dirActiveCategory?CATEGORIES.find(c=>c.id===dirActiveCategory)?.label:'';document.getElementById('dirCount').innerHTML=`<strong>${res.length}</strong> negocio${res.length!==1?'s':''} encontrado${res.length!==1?'s':''}${cl?` en <span class="highlight">${cl}</span>`:''}`;const el=document.getElementById('dirResults');if(res.length===0){el.innerHTML=`<div class="empty-state"><div class="empty-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg></div><div class="empty-title">Sin resultados</div><div class="empty-desc">Intenta con otra búsqueda o categoría.</div></div>`;return;}el.innerHTML=dirViewMode==='grid'?`<div class="cards-grid">${res.map(gridCardHTML).join('')}</div>`:`<div class="cards-list">${res.map(listCardHTML).join('')}</div>`;} 

function renderFavorites(){const favs=BUSINESSES.filter(b=>favorites.has(b.id));document.getElementById('favsCount').textContent=`${favs.length} negocio${favs.length!==1?'s':''} guardado${favs.length!==1?'s':''}`;const el=document.getElementById('favsResults');el.innerHTML=favs.length===0?`<div class="empty-state"><div class="fav-empty-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg></div><div class="empty-title">Tu lista está vacía</div><div class="empty-desc" style="max-width:360px">Guarda tus negocios favoritos tocando el ícono del corazón.</div></div>`:`<div class="cards-grid">${favs.map(gridCardHTML).join('')}</div>`;} 

buildCategories();buildHome();updateNav();
// Inicializar drag-scroll en cat-filters cuando se muestre el directorio
// (se llama también desde goPage)
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
    document.getElementById("userName").textContent = "Hola, " + name;
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
            showToast('¡Foto de perfil actualizada! 📸');
        }
    };
    reader.readAsDataURL(file);
}

// Handlers llamados desde onchange="handleXxx(this)" — reciben el input directamente
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

// Colores para la inicial
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

// Avatares emoji predeterminados
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

  list.innerHTML = comments.slice().reverse().map((c) => {
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

// Aplicar tema guardado al cargar la página
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


// ============================================================
// DASHBOARD – Panel de plan y analíticas
// ============================================================

// Datos de planes para el panel
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

// Genera datos de analíticas simulados basados en los negocios registrados
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

// Genera etiquetas de días para la gráfica
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

// Genera datos de visitas para la gráfica
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

// Abre el detalle de un negocio registrado en el directorio (si existe) o muestra toast
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
