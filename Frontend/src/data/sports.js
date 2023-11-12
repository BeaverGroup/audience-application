const sports = [
    {
        "name": "3x3 Basketball",
        "description": "A faster-paced version of traditional basketball played with three players on each team on a half-court.",
        "image_url": "https://mir-s3-cdn-cf.behance.net/projects/404/63dcf7128656315.Y3JvcCwxOTk5LDE1NjQsMCw0.png"
    },
    {
        "name": "Archery",
        "description": "Competitive sport involving shooting arrows at a target with a bow.",
        "image_url": "https://mir-s3-cdn-cf.behance.net/projects/404/63dcf7128656315.Y3JvcCwxOTk5LDE1NjQsMCw0.png"
    },
    {
        "name": "Artistic Gymnastics",
        "description": "Gymnastic discipline that emphasizes balance, strength, and creative routines on various apparatus.",
        "image_url": "https://mir-s3-cdn-cf.behance.net/projects/404/63dcf7128656315.Y3JvcCwxOTk5LDE1NjQsMCw0.png"
    },
    {
        "name": "Artistic Swimming",
        "description": "Synchronized swimming discipline where athletes perform synchronized routines in the water.",
        "image_url": "https://mir-s3-cdn-cf.behance.net/projects/404/63dcf7128656315.Y3JvcCwxOTk5LDE1NjQsMCw0.png"
    },
    {
        "name": "Athletics",
        "description": "Track and field events that encompass running, jumping, throwing, and more.",
        "image_url": "https://mir-s3-cdn-cf.behance.net/projects/404/63dcf7128656315.Y3JvcCwxOTk5LDE1NjQsMCw0.png"
    },
    {
        "name": "Badminton",
        "description": "Racket sport played with a shuttlecock, emphasizing agility and precision.",
        "image_url": "https://mir-s3-cdn-cf.behance.net/projects/404/63dcf7128656315.Y3JvcCwxOTk5LDE1NjQsMCw0.png"
    },
    {
        "name": "Baseball Softball",
        "description": "Team sports that involve hitting and fielding a ball.",
        "image_url": "https://mir-s3-cdn-cf.behance.net/projects/404/63dcf7128656315.Y3JvcCwxOTk5LDE1NjQsMCw0.png"
    },
    {
        "name": "Basketball",
        "description": "Fast-paced team sport involving dribbling and shooting a ball into the opposing team's hoop.",
        "image_url": "https://mir-s3-cdn-cf.behance.net/projects/404/63dcf7128656315.Y3JvcCwxOTk5LDE1NjQsMCw0.png"
    },
    {
        "name": "Beach Volleyball",
        "description": "Variation of indoor volleyball played on a sandy court with two-player teams.",
        "image_url": "https://mir-s3-cdn-cf.behance.net/projects/404/63dcf7128656315.Y3JvcCwxOTk5LDE1NjQsMCw0.png"
    },
    {
        "name": "Boxing",
        "description": "Combat sport involving punches and defensive techniques.",
        "image_url": "https://mir-s3-cdn-cf.behance.net/projects/404/63dcf7128656315.Y3JvcCwxOTk5LDE1NjQsMCw0.png"
    },
    {
        "name": "Breaking",
        "description": "A competitive discipline within hip-hop dancing that involves creativity, style, and execution.",
        "image_url": "https://mir-s3-cdn-cf.behance.net/projects/404/63dcf7128656315.Y3JvcCwxOTk5LDE1NjQsMCw0.png"
    },
    {
        "name": "Canoe Flatwater",
        "description": "Flatwater canoeing competitions that involve sprinting on still or calm water.",
        "image_url": "https://mir-s3-cdn-cf.behance.net/projects/404/63dcf7128656315.Y3JvcCwxOTk5LDE1NjQsMCw0.png"
    },
    {
        "name": "Canoe Slalom",
        "description": "Canoeing discipline involving navigating a challenging whitewater course with gates.",
        "image_url": "https://mir-s3-cdn-cf.behance.net/projects/404/63dcf7128656315.Y3JvcCwxOTk5LDE1NjQsMCw0.png"
    },
    {
        "name": "Cricket",
        "description": "Bat-and-ball game played between two teams involving batting, bowling, and fielding.",
        "image_url": "https://mir-s3-cdn-cf.behance.net/projects/404/63dcf7128656315.Y3JvcCwxOTk5LDE1NjQsMCw0.png"
    },
    {
        "name": "Cycling BMX Freestyle",
        "description": "BMX cycling discipline focused on performing tricks and stunts on a BMX bike.",
        "image_url": "https://mir-s3-cdn-cf.behance.net/projects/404/63dcf7128656315.Y3JvcCwxOTk5LDE1NjQsMCw0.png"
    },
    {
        "name": "Cycling BMX Racing",
        "description": "BMX cycling discipline emphasizing speed and racing on a track.",
        "image_url": "https://mir-s3-cdn-cf.behance.net/projects/404/63dcf7128656315.Y3JvcCwxOTk5LDE1NjQsMCw0.png"
    },
    {
        "name": "Cycling Mountain Bike",
        "description": "Off-road cycling discipline that involves navigating natural terrains and obstacles.",
        "image_url": "https://mir-s3-cdn-cf.behance.net/projects/404/63dcf7128656315.Y3JvcCwxOTk5LDE1NjQsMCw0.png"
    },
    {
        "name": "Cycling Road",
        "description": "Road cycling competitions that take place on public roads with various terrains.",
        "image_url": "https://mir-s3-cdn-cf.behance.net/projects/404/63dcf7128656315.Y3JvcCwxOTk5LDE1NjQsMCw0.png"
    },
    {
        "name": "Cycling Track",
        "description": "Cycling events taking place on a banked oval track.",
        "image_url": "https://mir-s3-cdn-cf.behance.net/projects/404/63dcf7128656315.Y3JvcCwxOTk5LDE1NjQsMCw0.png"
    },
    {
        "name": "Diving",
        "description": "Competitions that involve diving into a pool with precise acrobatic techniques.",
        "image_url": "https://mir-s3-cdn-cf.behance.net/projects/404/63dcf7128656315.Y3JvcCwxOTk5LDE1NjQsMCw0.png"
    },
    {
        "name": "Equestrian",
        "description": "Events involving horseback riding, including dressage, jumping, and eventing.",
        "image_url": "https://mir-s3-cdn-cf.behance.net/projects/404/63dcf7128656315.Y3JvcCwxOTk5LDE1NjQsMCw0.png"
    },
    {
        "name": "Fencing",
        "description": "Combat sport using swords where participants score points by touching their opponent.",
        "image_url": "https://mir-s3-cdn-cf.behance.net/projects/404/63dcf7128656315.Y3JvcCwxOTk5LDE1NjQsMCw0.png"
    },
    {
        "name": "Flag Football",
        "description": "Variation of American football that emphasizes flag-pulling instead of tackling.",
        "image_url": "https://mir-s3-cdn-cf.behance.net/projects/404/63dcf7128656315.Y3JvcCwxOTk5LDE1NjQsMCw0.png"
    },
    {
        "name": "Football",
        "description": "Team sport involving scoring goals by getting a ball into the opposing team's goal.",
        "image_url": "https://mir-s3-cdn-cf.behance.net/projects/404/63dcf7128656315.Y3JvcCwxOTk5LDE1NjQsMCw0.png"
    },
    {
        "name": "Golf",
        "description": "Individual sport where players use as few strokes as possible to complete a course.",
        "image_url": "https://mir-s3-cdn-cf.behance.net/projects/404/63dcf7128656315.Y3JvcCwxOTk5LDE1NjQsMCw0.png"
    },
    {
        "name": "Handball",
        "description": "Team sport involving passing a ball with hands and scoring in the opponent's goal.",
        "image_url": "https://mir-s3-cdn-cf.behance.net/projects/404/63dcf7128656315.Y3JvcCwxOTk5LDE1NjQsMCw0.png"
    },
    {
        "name": "Hockey",
        "description": "Field hockey competitions that involve scoring goals with a ball.",
        "image_url": "https://mir-s3-cdn-cf.behance.net/projects/404/63dcf7128656315.Y3JvcCwxOTk5LDE1NjQsMCw0.png"
    },
    {
        "name": "Judo",
        "description": "Japanese martial art that emphasizes throws and joint locks.",
        "image_url": "https://mir-s3-cdn-cf.behance.net/projects/404/63dcf7128656315.Y3JvcCwxOTk5LDE1NjQsMCw0.png"
    },
    {
        "name": "Karate",
        "description": "Japanese martial art involving strikes, kicks, and defensive techniques.",
        "image_url": "https://mir-s3-cdn-cf.behance.net/projects/404/63dcf7128656315.Y3JvcCwxOTk5LDE1NjQsMCw0.png"
    },
    {
        "name": "Lacrosse",
        "description": "Team sport that involves passing a ball and scoring goals with a netted stick.",
        "image_url": "https://mir-s3-cdn-cf.behance.net/projects/404/63dcf7128656315.Y3JvcCwxOTk5LDE1NjQsMCw0.png"
    },
    {
        "name": "Marathon Swimming",
        "description": "Long-distance open water swimming races.",
        "image_url": "https://mir-s3-cdn-cf.behance.net/projects/404/63dcf7128656315.Y3JvcCwxOTk5LDE1NjQsMCw0.png"
    },
    {
        "name": "Modern Pentathlon",
        "description": "Multi-sport event consisting of fencing, swimming, riding, shooting, and running.",
        "image_url": "https://mir-s3-cdn-cf.behance.net/projects/404/63dcf7128656315.Y3JvcCwxOTk5LDE1NjQsMCw0.png"
    },
    {
        "name": "Rhythmic Gymnastics",
        "description": "Gymnastic discipline involving rhythmic routines and apparatus.",
        "image_url": "https://mir-s3-cdn-cf.behance.net/projects/404/63dcf7128656315.Y3JvcCwxOTk5LDE1NjQsMCw0.png"
    },
    {
        "name": "Rowing",
        "description": "Competitions in which teams propel a boat with oars.",
        "image_url": "https://mir-s3-cdn-cf.behance.net/projects/404/63dcf7128656315.Y3JvcCwxOTk5LDE1NjQsMCw0.png"
    },
    {
        "name": "Rugby Sevens",
        "description": "Rugby variant with seven players per team, played in a shorter format.",
        "image_url": "https://mir-s3-cdn-cf.behance.net/projects/404/63dcf7128656315.Y3JvcCwxOTk5LDE1NjQsMCw0.png"
    },
    {
        "name": "Sailing",
        "description": "Competitive sailing events involving various classes of boats.",
        "image_url": "https://mir-s3-cdn-cf.behance.net/projects/404/63dcf7128656315.Y3JvcCwxOTk5LDE1NjQsMCw0.png"
    },
    {
        "name": "Shooting",
        "description": "Competitions involving firearms with precision and rapid-fire events.",
        "image_url": "https://mir-s3-cdn-cf.behance.net/projects/404/63dcf7128656315.Y3JvcCwxOTk5LDE1NjQsMCw0.png"
    },
    {
        "name": "Skateboarding",
        "description": "Extreme sport involving performing tricks on a skateboard.",
        "image_url": "https://mir-s3-cdn-cf.behance.net/projects/404/63dcf7128656315.Y3JvcCwxOTk5LDE1NjQsMCw0.png",
    },
    {
        "name": "Sport Climbing",
        "description": "Competitive climbing on artificial walls, including bouldering, lead, and speed events.",
        "image_url": "https://mir-s3-cdn-cf.behance.net/projects/404/63dcf7128656315.Y3JvcCwxOTk5LDE1NjQsMCw0.png"
    },
    {
        "name": "Squash",
        "description": "Racket sport played in a four-walled court, emphasizing agility and accuracy.",
        "image_url": "https://mir-s3-cdn-cf.behance.net/projects/404/63dcf7128656315.Y3JvcCwxOTk5LDE1NjQsMCw0.png"
    },
    {
        "name": "Surfing",
        "description": "Riding ocean waves using a surfboard, judged on style and performance.",
        "image_url": "https://mir-s3-cdn-cf.behance.net/projects/404/63dcf7128656315.Y3JvcCwxOTk5LDE1NjQsMCw0.png"
    },
    {
        "name": "Swimming",
        "description": "Pool and open water races covering various distances and strokes.",
        "image_url": "https://mir-s3-cdn-cf.behance.net/projects/404/63dcf7128656315.Y3JvcCwxOTk5LDE1NjQsMCw0.png"
    },
    {
        "name": "Taekwondo",
        "description": "Korean martial art emphasizing high, fast kicks and jumping and spinning kicks.",
        "image_url": "https://mir-s3-cdn-cf.behance.net/projects/404/63dcf7128656315.Y3JvcCwxOTk5LDE1NjQsMCw0.png"
    },
    {
        "name": "Tennis",
        "description": "Racket sport played individually or in pairs, involving a net and a ball.",
        "image_url": "https://mir-s3-cdn-cf.behance.net/projects/404/63dcf7128656315.Y3JvcCwxOTk5LDE1NjQsMCw0.png"
    },
    {
        "name": "Trampoline",
        "description": "Gymnastic discipline involving acrobatic routines performed on a trampoline.",
        "image_url": "https://mir-s3-cdn-cf.behance.net/projects/404/63dcf7128656315.Y3JvcCwxOTk5LDE1NjQsMCw0.png"
    },
    {
        "name": "Triathlon",
        "description": "Multi-sport race consisting of swimming, cycling, and running segments.",
        "image_url": "https://mir-s3-cdn-cf.behance.net/projects/404/63dcf7128656315.Y3JvcCwxOTk5LDE1NjQsMCw0.png"
    }
]


export default sports