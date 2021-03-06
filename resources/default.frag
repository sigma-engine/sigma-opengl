#version 460

#include <pbr/deffered/geometry_buffer.glsl>
#include <uniforms.glsl>
#include <vertex.glsl>

layout(binding = 0) uniform sampler2D basecolor_map;
layout(binding = 1) uniform sampler2D metallic_map;
layout(binding = 2) uniform sampler2D normal_map;
layout(binding = 3) uniform sampler2D roughness_map;

void main()
{
    surface s;
    mat3 tbn = mat3(in_vertex.tangent, in_vertex.bitangent, in_vertex.normal);

    // TODO do this conversion on the cpu
    s.diffuse = pow(texture(basecolor_map, in_vertex.texcoord).rgb, vec3(2.2));
    s.metalness = texture(metallic_map, in_vertex.texcoord).r;
    s.roughness = texture(roughness_map, in_vertex.texcoord).r;
    vec3 N = texture(normal_map, in_vertex.texcoord).xyz;
    N.xy = (N.xy) * 2.0 - 1.0;
    s.normal = normalize(tbn * N);
    write_geometry_buffer(s);
}
