export const Models = {
  ACL:
    '[request_definition]\n' +
    'r = sub, obj, act\n' +
    '\n' +
    '[policy_definition]\n' +
    'p = sub, obj, act\n' +
    '\n' +
    '[policy_effect]\n' +
    'e = some(where (p.eft == allow))\n' +
    '\n' +
    '[matchers]\n' +
    'm = r.sub == p.sub && r.obj == p.obj && r.act == p.act',

  'ACL with superuser':
    '[request_definition]\n' +
    'r = sub, obj, act\n' +
    '\n' +
    '[policy_definition]\n' +
    'p = sub, obj, act\n' +
    '\n' +
    '[policy_effect]\n' +
    'e = some(where (p.eft == allow))\n' +
    '\n' +
    '[matchers]\n' +
    'm = r.sub == p.sub && r.obj == p.obj && r.act == p.act || r.sub == "root"',

  'ACL without users':
    '[request_definition]\n' +
    'r = obj, act\n' +
    '\n' +
    '[policy_definition]\n' +
    'p = obj, act\n' +
    '\n' +
    '[policy_effect]\n' +
    'e = some(where (p.eft == allow))\n' +
    '\n' +
    '[matchers]\n' +
    'm = r.obj == p.obj && r.act == p.act',

  'ACL without resources':
    '[request_definition]\n' +
    'r = sub, act\n' +
    '\n' +
    '[policy_definition]\n' +
    'p = sub, act\n' +
    '\n' +
    '[policy_effect]\n' +
    'e = some(where (p.eft == allow))\n' +
    '\n' +
    '[matchers]\n' +
    'm = r.sub == p.sub && r.act == p.act',

  RBAC:
    '[request_definition]\n' +
    'r = sub, obj, act\n' +
    '\n' +
    '[policy_definition]\n' +
    'p = sub, obj, act\n' +
    '\n' +
    '[role_definition]\n' +
    'g = _, _\n' +
    '\n' +
    '[policy_effect]\n' +
    'e = some(where (p.eft == allow))\n' +
    '\n' +
    '[matchers]\n' +
    'm = g(r.sub, p.sub) && r.obj == p.obj && r.act == p.act',

  'RBAC with resource roles':
    '[request_definition]\n' +
    'r = sub, obj, act\n' +
    '\n' +
    '[policy_definition]\n' +
    'p = sub, obj, act\n' +
    '\n' +
    '[role_definition]\n' +
    'g = _, _\n' +
    'g2 = _, _\n' +
    '\n' +
    '[policy_effect]\n' +
    'e = some(where (p.eft == allow))\n' +
    '\n' +
    '[matchers]\n' +
    'm = g(r.sub, p.sub) && g2(r.obj, p.obj) && r.act == p.act',

  'RBAC with domains/tenants':
    '[request_definition]\n' +
    'r = sub, dom, obj, act\n' +
    '\n' +
    '[policy_definition]\n' +
    'p = sub, dom, obj, act\n' +
    '\n' +
    '[role_definition]\n' +
    'g = _, _, _\n' +
    '\n' +
    '[policy_effect]\n' +
    'e = some(where (p.eft == allow))\n' +
    '\n' +
    '[matchers]\n' +
    'm = g(r.sub, p.sub, r.dom) && r.dom == p.dom && r.obj == p.obj && r.act == p.act',

  ABAC:
    '[request_definition]\n' +
    'r = sub, obj, act\n' +
    '\n' +
    '[policy_definition]\n' +
    'p = sub, obj, act\n' +
    '\n' +
    '[policy_effect]\n' +
    'e = some(where (p.eft == allow))\n' +
    '\n' +
    '[matchers]\n' +
    'm = r.sub == r.obj.Owner',

  RESTful:
    '[request_definition]\n' +
    'r = sub, obj, act\n' +
    '\n' +
    '[policy_definition]\n' +
    'p = sub, obj, act\n' +
    '\n' +
    '[policy_effect]\n' +
    'e = some(where (p.eft == allow))\n' +
    '\n' +
    '[matchers]\n' +
    'm = r.sub == p.sub && keyMatch(r.obj, p.obj) && regexMatch(r.act, p.act)',

  'RBAC with Deny-override':
    '[request_definition]\n' +
    'r = sub, obj, act\n' +
    '\n' +
    '[policy_definition]\n' +
    'p = sub, obj, act, eft\n' +
    '\n' +
    '[role_definition]\n' +
    'g = _, _\n' +
    '\n' +
    '[policy_effect]\n' +
    'e = !some(where (p.eft == deny))\n' +
    '\n' +
    '[matchers]\n' +
    'm = g(r.sub, p.sub) && r.obj == p.obj && r.act == p.act',

  'RBAC Allow-and-deny':
    '[request_definition]\n' +
    'r = sub, obj, act\n' +
    '\n' +
    '[policy_definition]\n' +
    'p = sub, obj, act, eft\n' +
    '\n' +
    '[role_definition]\n' +
    'g = _, _\n' +
    '\n' +
    '[policy_effect]\n' +
    'e = some(where (p.eft == allow)) && !some(where (p.eft == deny))\n' +
    '\n' +
    '[matchers]\n' +
    'm = g(r.sub, p.sub) && r.obj == p.obj && r.act == p.act',

  Priority:
    '[request_definition]\n' +
    'r = sub, obj, act\n' +
    '\n' +
    '[policy_definition]\n' +
    'p = sub, obj, act, eft\n' +
    '\n' +
    '[role_definition]\n' +
    'g = _, _\n' +
    '\n' +
    '[policy_effect]\n' +
    'e = priority(p.eft) || deny\n' +
    '\n' +
    '[matchers]\n' +
    'm = g(r.sub, p.sub) && r.obj == p.obj && r.act == p.act',

  'Explicit Priority':
    '[request_definition]\n' +
    'r = sub, obj, act\n' +
    '\n' +
    '[policy_definition]\n' +
    'p = sub, obj, act, eft\n' +
    '\n' +
    '[role_definition]\n' +
    'g = _, _\n' +
    '\n' +
    '[policy_effect]\n' +
    'e = priority(p.eft) || deny\n' +
    '\n' +
    '[matchers]\n' +
    'm = g(r.sub, p.sub) && r.obj == p.obj && r.act == p.act',

  'Subject-Priority':
    '[request_definition]\n' +
    'r = sub, obj, act\n' +
    '\n' +
    '[policy_definition]\n' +
    'p = sub, obj, act, eft\n' +
    '\n' +
    '[role_definition]\n' +
    'g = _, _\n' +
    '\n' +
    '[policy_effect]\n' +
    'e = subjectPriority(p.eft) || deny\n' +
    '\n' +
    '[matchers]\n' +
    'm = g(r.sub, p.sub) && r.obj == p.obj && r.act == p.act',
};
