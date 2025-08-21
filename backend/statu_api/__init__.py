# statu_api/__init__.py
try:
    import pymysql
    pymysql.install_as_MySQLdb()
except Exception:
    pass
